import { Router } from 'express';
import { validateBody } from '../middlewares';
import { createBetSchema } from '../schemas/bet-schema';
import { createBet, getBets } from '../controllers/bets-controller';

const betsRouter = Router();

betsRouter
    .post('/', validateBody(createBetSchema), createBet)
    .get('/', getBets);
    //.get('/:betId', getBetById);

export { betsRouter };