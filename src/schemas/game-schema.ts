import joi from 'joi';
import { CreateGameInput, FinishGameInput } from '../protocols';

export const createGameSchema = joi.object<CreateGameInput>({
    homeTeamName: joi.string().required(),
    awayTeamName: joi.string().required()
});

export const finishGameSchema = joi.object<FinishGameInput>({
    homeTeamScore: joi.number().required(),
    awayTeamScore: joi.number().required()
});