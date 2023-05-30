# Full Stack JavaScript Chatroom Application

This repository contains the code for a full stack JavaScript web application, based on the concepts presented in the YouTube video tutorial [Build a Realtime Chat Application with React.js, Socket.io, Node.js & TypeScript](https://www.youtube.com/watch?v=a_xo-SbIfUQ).

This repository contains the code for a full stack JavaScript chatroom application built with Express, Socket.IO, React, TypeScript, and functional components. The application provides real-time communication between users and supports features like chat message broadcasting and user presence tracking.

## Technologies Used

- Front-end:
  - React
  - TypeScript
  - Functional Components
  - Socket.IO Client

- Back-end:
  - Express
  - Socket.IO
  - PostgreSQL (Planned for future integration)

## Features

- Real-time Chat: Users can send and receive messages in real-time within the chatroom.
- User Presence: The application tracks the presence of users, indicating whether they are online or offline.
- Typing Indicator: Users are provided with typing indicators to show when someone is actively typing a message.
- Message Broadcasting: Messages sent by a user are broadcasted to all connected users in the chatroom.
- Emojis: The application supports emoji input for users to express themselves effectively.

## Getting Started

To get started with the application, follow these steps:

1. Clone this repository: `git clone https://github.com/dimzerdevas/repository.git`
2. Install the dependencies:
   - For the server, navigate to the `server` directory and run `npm install`.
   - For the client, navigate to the `client` directory and run `npm install`.
3. Start the server:
   - Go to the `server` directory and run `npm start`.
4. Start the client:
   - Go to the `client` directory and run `npm start`.
5. Access the application in your web browser at `http://localhost:3000`.

## Future Additions

In the future, we plan to integrate a PostgreSQL database to provide persistent storage for chat messages, user profiles, and other relevant data.
