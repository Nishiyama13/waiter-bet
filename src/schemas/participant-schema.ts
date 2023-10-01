import joi from 'joi';
import { CreateParticipantInput } from '../protocols';

export const createParticipantSchema = joi.object<CreateParticipantInput>({
    name: joi.string().required(),
    balance: joi.number().integer().min(1000).required(),
});