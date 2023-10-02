import { Router } from 'express';
import { validateBody } from '../middlewares';
import { createParticipantSchema } from '../schemas/participant-schema';
import { createParticipant, getParticipants } from '../controllers/participants-controller';

const participantsRouter = Router();

participantsRouter
    .post('/', validateBody(createParticipantSchema), createParticipant)
    .get('/', getParticipants);
    //.get('/:id', getParticipantsById);

export { participantsRouter };