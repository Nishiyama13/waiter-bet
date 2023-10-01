import joi from 'joi';
import { CreateBetInput } from '../protocols';

export const createBetSchema = joi.object<CreateBetInput>({
    homeTeamScore: joi.number().required(),
    awayTeamScore: joi.number().required(),
    amountBet: joi.number().required(),
    gameId: joi.number().required(),
    participantId: joi.number().required(),
});