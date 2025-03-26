import { RoomServiceClient } from 'livekit-server-sdk';

// Initialize LiveKit RoomServiceClient
const livekitHost = process.env.NEXT_PUBLIC_LIVEKIT_URL; // LiveKit server URL
const roomService = new RoomServiceClient(livekitHost, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET);

// Function to create a room with the event ID as the room name
export async function createRoom(eventId) {
    console.log("hi below is event id");
    console.log(eventId);
    try {
        // Create room with the name as eventId and any other options you need
        const room = await roomService.createRoom({
            name: eventId,              // The room name (event ID)
            emptyTimeout: 1000,          // Optional: how long until the room times out after being empty (in seconds)
            maxParticipants: 10,        // Optional: max number of participants
        });

        // Only generate and return the room link if the room is successfully created
        if (room && room.name === eventId) {
            const roomLink = `https://meet-app-innovation-project-24.vercel.app/rooms/${eventId}`;
            return roomLink;
        } else {
            throw new Error(`Room creation failed for event ${eventId}: Room response was invalid.`);
        }
    } catch (error) {
        console.error(`Error creating room for event ${eventId}:`, error);
        throw new Error('Room creation failed');
    }
}