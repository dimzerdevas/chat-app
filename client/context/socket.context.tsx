import io, { Socket } from 'socket.io-client';
import { createContext, useContext, useState } from 'react';
import { SOCKET_URL } from '../config/default';

interface Context {
    socket: Socket;
    username?: string;
    setUsername?: Function;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({socket, setUsername: () => false});

function SocketsProvider(props: any) {
    const [username, setUsername] = useState("");

    return (
        <SocketContext.Provider
            {...props}
            value={{ socket, username, setUsername }}
        />
    )
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;