import express, { Express } from 'express';
import { handleApplicationErrors } from './middlewares';
import cors from 'cors';
import { loadEnv, connectDb, disconnectDB } from './config';
loadEnv();

import { betsRouter, gamesRouter, participantsRouter } from './routers';

const app = express();
app
    .use(cors())
    .use(express.json())
    .get('/health', (_req, res) => res.send("ok!"))
    .use('/participants', participantsRouter)
    .use('/games', gamesRouter)
    .use('/bets', betsRouter)
    .use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;