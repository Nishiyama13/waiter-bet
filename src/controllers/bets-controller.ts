import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateBetInput } from '../protocols';
import betsService from '../services/bets-service';

export async function createBet(req: Request, res: Response ) {
    const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body as CreateBetInput;

    try {
        const bet = await betsService.createBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });
        return res.status(httpStatus.CREATED).json(bet);
    } catch (error) {
        if (error.name === 'InsufficientFundsError') {
            return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
        }
        if (error.message === 'This game has already been finished') {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        if (error.message === 'Your bet cannot be placed, please try later!') {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
        if (error.message === 'Your bet cannot be placed, please try later!') {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
        
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function getBets(req: Request, res: Response) {
    try {
        const bets = await betsService.getBets();
        return res.send(bets);
    } catch (error) {
        if (error.name === 'NotFound') {
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}