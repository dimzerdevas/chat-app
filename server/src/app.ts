// Import necessary modules and libraries
import express from 'express'; // Import Express.js library for creating an HTTP server
import { createServer } from 'http'; // Import the 'createServer' function from the 'http' module
import { Server } from 'socket.io'; // Import the 'Server' class from the 'socket.io' module
import cors from 'cors'; // Import the 'cors' module for handling Cross-Origin Resource Sharing
import config from 'config'; // Import the 'config' module for configuration management
import logger from './utils/logger'; // Import the logger module for logging
import { version } from "../package.json"; // Import the server version from the 'package.json' file
import socket from './socket'; // Import the socket module for handling real-time communication

// Retrieve configuration values from the 'config' module
const port = config.get<number>("port"); // Get the port number from the configuration
const host = config.get<string>("host"); // Get the host name from the configuration
const corsOrigin = config.get<string>("corsOrigin"); // Get the CORS origin from the configuration

// Create an instance of the Express application
const app = express();

// Create an HTTP server using the Express application
const httpServer = createServer(app);

// Create a new instance of Socket.io and attach it to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    }
});

// Set up a route handler for the root endpoint ('/')
// When someone visits the root URL, the server will respond with a message including the server version
app.get('/', (_, res) => res.send(`Server is up and running version ${version}`));

// Start the HTTP server and make it listen on a specific host and port
httpServer.listen(port, host, () => {
    // Log a message to indicate that the server is listening
    logger.info('🚀server is listening 🚀');

    // Log the URL where the server is accessible
    logger.info(`http://${host}:${port}`);

    // Initialize Socket.io for real-time communication
    socket({ io });
});
