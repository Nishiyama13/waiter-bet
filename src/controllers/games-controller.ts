import { Request, Response } from 'express';
import httpStatus from 'http-status';
import gamesService from '../services/games-service';
import { CreateGameInput } from '../protocols';

export async function createGame(req: Request, res: Response ) {
    const { homeTeamName, awayTeamName } = req.body as CreateGameInput;

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
        if (error.name === 'DuplicateGameError') {
            return res.status(httpStatus.CONFLICT).send(error);
        }

        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}

export async function getGames(req: Request, res: Response) {
    try {
        const games = await gamesService.getGames();
        return res.send(games);
    } catch (error) {
        if (error.name === 'NotFound') {
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function getGameById(req:Request, res:Response) {
    const { gameId } = req.params;

    try {
        const game = await gamesService.getGameById(Number(gameId));
        return res.send(game);
    } catch (error) {
        if (error.name === 'NotFound') {
            return res.status(httpStatus.NOT_FOUND).send(error);
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}