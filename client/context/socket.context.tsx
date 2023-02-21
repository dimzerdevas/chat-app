import io, { Socket } from 'socket.io-client';
import { createContext, useContext, useState } from 'react';
import { SOCKET_URL } from '../config/default';
import EVENTS from '../config/events';

interface Context {
    socket: Socket;
    username?: string;
    setUsername?: Function;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({ socket, setUsername: () => false });

function SocketsProvider(props: any) {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState({});

    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        console.log('set rooms value: ', value);
        setRooms(value);
    })
    return (
        <SocketContext.Provider
            {...props}
            value={{ socket, username, setUsername, rooms, roomId }}
        />
    )
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;