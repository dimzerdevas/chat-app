import io, { Socket } from 'socket.io-client';
import { createContext, useContext, useState, useEffect } from 'react';
import { SOCKET_URL } from '../config/default';
import EVENTS from '../config/events';

// Define the context interface specifying the available context properties
interface Context {
    socket: Socket;
    username?: string;
    setUsername?: Function;
    messages?: { message: string, username: string, time: string }[];
    setMessages?: Function;
    roomId?: string;
    rooms?: object;
}

// Create a socket instance by connecting to the socket server using the provided URL
const socket = io(SOCKET_URL);

// Create the SocketContext using createContext and provide default values for the context properties
const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    rooms: {},
    messages: [],
});

// Define the SocketsProvider component which acts as the context provider
function SocketsProvider(props: any) {
    // Define state variables to store username, room ID, rooms, and messages
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState({});
    const [messages, setMessages] = useState([]);

    // Execute the effect when the component is mounted
    useEffect(() => {
        // Set the document title when the window gains focus
        window.onfocus = () => {
            document.title = "Chat App";
        };
    }, []);

    // Event listener for receiving the list of available rooms from the server
    socket.on(EVENTS.SERVER.ROOMS, (value) => {
        setRooms(value);
    });

    // Event listener for joining a room on the server
    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
        setMessages([]);
    });

    // Event listener for receiving messages in a room from the server
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
        if (!document.hasFocus()) {
            document.title = "New message...";
        }
        setMessages([
            ...messages,
            { message, username, time }
        ]);
    });

    // Render the SocketContext.Provider component and pass the context values as the value prop
    return (
        <SocketContext.Provider
            {...props}
            value={{ socket, username, setUsername, rooms, roomId, messages, setMessages }}
        />
    );
}

// Custom hook to consume the socket context in components
export const useSockets = () => useContext(SocketContext);

// Export the SocketsProvider component as the default export of this module
export default SocketsProvider;