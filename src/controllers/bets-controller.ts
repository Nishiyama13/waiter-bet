import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateBetInput } from '../protocols';
import betsService from '../services/bets-service';

export async function createBet(req: Request, res: Response ) {
    const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body as CreateBetInput;

    try {
        const bet = await betsService.createBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });
        return res.status(httpStatus.CREATED).json({
            id: bet.id,
            createdAt: bet.createdAt,
            updatedAt: bet.updatedAt,
            homeTeamScore: bet.homeTeamScore,
            awayTeamScore: bet.awayTeamScore,
            amountBet:bet,
            gameId:bet,
            participantId:bet,
            status:bet,
            amountWon:bet,

        });
    } catch (error) {
        if (error.name === 'InsufficientFundsError') {
            return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
        }

        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}