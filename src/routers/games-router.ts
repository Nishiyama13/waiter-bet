import { Router } from 'express';
import { validateBody, validateParams } from '../middlewares';
import { createGameSchema, finishGameSchema } from '../schemas/game-schema';
import { createGame, finishGameById, getGameById, getGames } from '../controllers/games-controller';
import { idSchema } from '../schemas/id-schema';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(createGameSchema), createGame)
    .get('/', getGames)
    .get('/:id', validateParams(idSchema), getGameById)
    .put('/:id/finish',validateBody(finishGameSchema), validateParams(idSchema), finishGameById);

export { gamesRouter };