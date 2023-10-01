import joi from 'joi';
import { CreateGameInput } from '../protocols';

export const createGameSchema = joi.object<CreateGameInput>({
    homeTeamName: joi.string().required(),
    awayTeamName: joi.string().required()
});