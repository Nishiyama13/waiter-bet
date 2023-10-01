import express, { json, Request, Response } from 'express';
import dotenv from 'dotenv';
import { handleApplicationErrors } from './middlewares/error-handler';

dotenv.config();

const app = express();
app.use(json());

app.get('/health', (req: Request, res: Response) => res.send("ok!"));
app.use(handleApplicationErrors);

export default app;