import io, { Socket } from 'socket.io-client';
import { createContext, useContext, useState, useEffect } from 'react';
import { SOCKET_URL } from '../config/default';
import EVENTS from '../config/events';
interface Context {
    socket: Socket;
    username?: string;
    setUsername?: Function;
    messages?: { message: string, username: string, time: string }[];
    setMessages?: Function;
    roomId?: string;
    rooms?: object;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    rooms: {},
    messages: [],
});

function SocketsProvider(props: any) {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState({});
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        window.onfocus = () => {
            document.title = "Chat App";
        }
    }, [])

    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRooms(value);
    });

    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
        setMessages([]);
    });

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
        if (!document.hasFocus()) {
            document.title = "New message...";
        }
        setMessages([
            ...messages,
            { message, username, time }
        ]);

    });

    return (
        <SocketContext.Provider
            {...props}
            value={{ socket, username, setUsername, rooms, roomId, messages, setMessages }}
        />
    )
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;