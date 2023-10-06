import { Router } from 'express';
import { validateBody, validateParams } from '../middlewares';
import { createParticipantSchema } from '../schemas/participant-schema';
import { createParticipant, getParticipantById, getParticipants } from '../controllers/participants-controller';
import { idSchema } from '../schemas/id-schema';

const participantsRouter = Router();

participantsRouter
    .post('/', validateBody(createParticipantSchema), createParticipant)
    .get('/', getParticipants)
    .get('/:id', validateParams(idSchema), getParticipantById);

export { participantsRouter };