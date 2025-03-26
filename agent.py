import logging
import asyncio
from dotenv import load_dotenv
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
    stt,
    transcription
)
from livekit.plugins import azure
import livekit.rtc as rtc

load_dotenv(dotenv_path=".env.local")
logging.basicConfig(level=logging.DEBUG)  # Enable debug logging
logger = logging.getLogger("stt-agent")

# Languages for different agents
LANGUAGES = ["hi-IN", "en-IN", "gu-IN", "pa-IN"]

def prewarm(proc: JobProcess, language: str):
    """Preload the Azure STT model for a specific language."""
    proc.userdata[f"stt_{language}"] = azure.STT(
        speech_key="",
        speech_host="https://ai-aihackthonhub282549186415.cognitiveservices.azure.com",
        language=language
    )

async def _forward_transcription(
    stt_stream: stt.SpeechStream,
    stt_forwarder: transcription.STTSegmentsForwarder,
    language: str
):
    """Forward the transcription to the frontend with the language included."""
    async for ev in stt_stream:
        if ev.type == stt.SpeechEventType.INTERIM_TRANSCRIPT:
            ev.alternatives[0].text=f"[{language}]  {ev.alternatives[0].text}"
            stt_forwarder.update(ev)
            print(f"[{language}] Interim: {ev.alternatives[0].text}", end="")
        elif ev.type == stt.SpeechEventType.FINAL_TRANSCRIPT:
            ev.alternatives[0].text=f"[{language}]  {ev.alternatives[0].text}"
            # stt_forwarder.update(ev)
            print(f"\n[{language}] -> {ev.alternatives[0].text}")



async def transcribe_track(participant: rtc.RemoteParticipant, track: rtc.Track, job: JobContext, language: str):
    """Run STT for a specific language agent."""
    stt = job.proc.userdata[f"stt_{language}"]
    audio_stream = rtc.AudioStream(track)
    stt_forwarder = transcription.STTSegmentsForwarder(
        room=job.room, participant=participant, track=track
    )
    stt_stream = stt.stream()
    stt_task = asyncio.create_task(_forward_transcription(stt_stream, stt_forwarder, language))

    async for ev in audio_stream:
        if ev.frame:
            frame_size = len(ev.frame.data)
            logger.debug(f"[{language}] Received audio frame: {frame_size} bytes")
        else:
            logger.warning(f"[{language}] Received empty audio frame")
        stt_stream.push_frame(ev.frame)

async def entrypoint(ctx: JobContext):
    """Initialize multiple STT agents for different languages."""
    logger.info(f"Connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    participant = await ctx.wait_for_participant()
    logger.info(f"Starting STT agents for participant {participant.identity}")

    @ctx.room.on("track_subscribed")
    def on_track_subscribed(
        track: rtc.Track,
        publication: rtc.TrackPublication,
        participant: rtc.RemoteParticipant,
    ):
        if track.kind == rtc.TrackKind.KIND_AUDIO:
            logger.info(f"Subscribed to audio track from {participant.identity}")

            # Run STT for each language
            for language in LANGUAGES:
                asyncio.create_task(transcribe_track(participant, track, ctx, language))

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=lambda proc: [prewarm(proc, lang) for lang in LANGUAGES],
        ),
    )
