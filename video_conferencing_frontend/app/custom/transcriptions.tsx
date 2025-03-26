import { useEffect, useState } from 'react';
import { TranscriptionSegment, Participant, TrackPublication, RoomEvent } from 'livekit-client';
import { useMaybeRoomContext } from '@livekit/components-react';

export default function Transcriptions() {
  const room = useMaybeRoomContext();

  // State for storing transcriptions
  const [transcriptions, setTranscriptions] = useState<{ [id: string]: TranscriptionSegment }>({});

  // Available languages
  const LANGUAGES = ['en-IN', 'hi-IN', 'gu-IN', 'pa-IN'];

  // State for selected language (default: English)
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');

  useEffect(() => {
    if (!room) {
      return;
    }

    const updateTranscriptions = (
      segments: TranscriptionSegment[],
      participant?: Participant,
      publication?: TrackPublication,
    ) => {
      setTranscriptions((prev) => {
        const newTranscriptions = { ...prev };
        for (const segment of segments) {
          newTranscriptions[segment.id] = segment;
        }
        console.log(newTranscriptions);
        return newTranscriptions;
      });
    };

    room.on(RoomEvent.TranscriptionReceived, updateTranscriptions);
    return () => {
      room.off(RoomEvent.TranscriptionReceived, updateTranscriptions);
    };
  }, [room]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <h3>Live Transcriptions</h3>

        {/* Language Selection Dropdown */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={{ padding: '5px', fontSize: '16px', marginBottom: '10px' }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <ul style={{ marginTop: '0px', paddingTop: '0px' }}>
        {Object.values(transcriptions).map((segment) => {
          const text = segment.text.trim();

          // 🔹 Extract language prefix from text (e.g., "[hi-IN] नमस्ते")
          const match = text.match(/^\[(.*?)\]\s(.*)/);
          console.log(match);
          if (!match) return null; // Ignore invalid formats

          const langPrefix = match[1]; // Extracted language code
          const actualText = match[2]; // Extracted transcription

          // 🔹 Filter based on selected language
          if (langPrefix !== selectedLanguage) return null;

          return (
            <h3 style={{ marginTop: '0px', paddingTop: '0px' }} key={segment.id}>
              {actualText}
            </h3>
          );
        })}
      </ul>
    </div>
  );
}
