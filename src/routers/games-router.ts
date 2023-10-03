import { Router } from 'express';
import { validateBody } from '../middlewares';
import { createGameSchema } from '../schemas/game-schema';
import { createGame, getGameById, getGames } from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(createGameSchema), createGame)
    .get('/', getGames)
    .get('/:gameId', getGameById);
    //.get('/:id/finish', getFinishGameById);

export { gamesRouter };