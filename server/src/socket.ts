import { Server, Socket } from "socket.io";
import logger from './utils/logger';

const nanoid = require('nanoid');

const EVENTS = {
    connection: 'connection',
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE',
        JOIN_ROOM: 'JOIN_ROOM'
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
    }
};

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
    logger.info(`Sockets enabled`);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected ${socket.id}`);

        // Emit the current state of the rooms object to the client
        socket.emit(EVENTS.SERVER.ROOMS, rooms);

        // Event: CLIENT.CREATE_ROOM
        socket.on(EVENTS.CLIENT.CREATE_ROOM, (roomName) => {
            // Create a unique roomId
            const roomId = nanoid();

            // Add a new room to the rooms object
            rooms[roomId] = {
                name: roomName
            };
            socket.join(roomId);

            // Broadcast an event to all clients (except the room creator) with the updated rooms object
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

            // Emit the updated rooms object back to the room creator
            socket.emit(EVENTS.SERVER.ROOMS, rooms);

            // Emit an event back to the room creator indicating that they have joined the room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });

        // Event: CLIENT.SEND_ROOM_MESSAGE
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({ roomId, message, username }) => {
            const date = new Date();

            // Emit the message to all clients in the specified room
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message,
                username,
                time: `${date.getHours()}:${date.getMinutes()}`
            })
        });

        // Event: CLIENT.JOIN_ROOM
        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
            // Join the specified room
            socket.join(roomId);

            // Emit an event back to the client indicating that they have joined the room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
    });
};

export default socket;
