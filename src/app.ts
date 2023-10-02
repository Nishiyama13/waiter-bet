import express, { Express } from 'express';
import { handleApplicationErrors } from './middlewares';
import cors from 'cors';
import { loadEnv, connectDb, disconnectDB } from './config';
import { participantsRouter } from './routers';

loadEnv();

const app = express();
app
    .use(cors())
    .use(express.json())
    .get('/health', (_req, res) => res.send("ok!"))
    .use('/participants', participantsRouter)
    .use(handleApplicationErrors);

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app)
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;