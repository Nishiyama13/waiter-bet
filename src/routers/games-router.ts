import { Router } from 'express';
import { validateBody } from '../middlewares';
import { createGameSchema } from '../schemas/game-schema';
import { createGame } from '../controllers/games-controller';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(createGameSchema), createGame);
    //.get('/', getGames);
    //.get('/:id', getGameById);
    //.get('/:id/finish', getFinishGameById);

export { gamesRouter };