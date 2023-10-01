import express, { json, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());

app.get('/health', (req: Request, res: Response) => res.send("ok!"));

export default app;