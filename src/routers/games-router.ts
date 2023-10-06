import { Router } from 'express';
import { validateBody } from '../middlewares';
import { createGameSchema, finishGameSchema } from '../schemas/game-schema';
import { createGame, finishGameById, getGameById, getGames } from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(createGameSchema), createGame)
    .get('/', getGames)
    .get('/:gameId', getGameById)
    .put('/:id/finish',validateBody(finishGameSchema), finishGameById);

export { gamesRouter };