import { Request, Response } from 'express';
import httpStatus from 'http-status';
import participantsService from '../services/participants-service';
export async function createParticipant(req: Request, res: Response ) {
    const { name, balance } = req.body;

    try {
        const participant = await participantsService.createParticipant({ name, balance });
        return res.status(httpStatus.CREATED).json({
            id: participant.id,
            name: participant.name,
            balance: participant.balance,
        });
    } catch (error) {
        if (error.name === 'DuplicateParticipantError') {
            return res.status(httpStatus.CONFLICT).send(error);
        }
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
    
}

export async function getParticipants(req: Request, res: Response) {
    try {
        const participants = await participantsService.getParticipants();
        return res.send(participants);
    } catch (error) {
        if (error.name === 'NotFound') {
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}