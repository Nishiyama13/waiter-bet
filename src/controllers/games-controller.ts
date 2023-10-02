import { Request, Response } from 'express';
import httpStatus from 'http-status';
import gamesService from '../services/games-service';

export async function createGame(req: Request, res: Response ) {
    const { homeTeamName, awayTeamName } = req.body;

    try {
        const game = await gamesService.createGame({ homeTeamName, awayTeamName });
        return res.status(httpStatus.CREATED).json({
            id: game.id,
            createdAt: game.createdAt,
            updatedAt: game.updatedAt,
            homeTeamName: game.homeTeamName,
            awayTeamName: game.awayTeamName,
            homeTeamScore: game.homeTeamScore,
            awayTeamScore: game.awayTeamScore,
            isFinished: game.isFinished,
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}