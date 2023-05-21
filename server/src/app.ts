import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import config from 'config';
import logger from './utils/logger';
import { version } from "../package.json";

import socket from './socket';

const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    }
});

app.get('/', (req, res) => {
    const requestInfo = `Received a <b>${req.method}</b> request to ${req.url}<br>`;
    const userAgent = `User-Agent: <b>${req.headers['user-agent']}</b><br>`;
    const serverVersion = `Server version: <b>${version}</b><br>`;
  
    const responseString = `${requestInfo}${userAgent}${serverVersion}`;
  
    res.send(responseString);
});

httpServer.listen(port, host, () => {
    logger.info('🚀server is listening 🚀');
    logger.info(`http://${host}:${port}`);

    socket({ io });
})