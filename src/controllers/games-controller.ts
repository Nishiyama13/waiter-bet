import { Request, Response } from 'express';
import httpStatus from 'http-status';
import gamesService from '../services/games-service';
import { CreateGameInput, FinishGameInput } from '../protocols';

export async function createGame(req: Request, res: Response ) {
    const { homeTeamName, awayTeamName } = req.body as CreateGameInput;

    try {
        const game = await gamesService.createGame({ homeTeamName, awayTeamName });
        return res.status(httpStatus.CREATED).json(game);
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

export async function finishGameById(req: Request, res: Response ) {
    const { homeTeamScore, awayTeamScore } = req.body as FinishGameInput;
    const gameId = Number(req.params.id);

    try {
        const gameById = await gamesService.getGameById(gameId);
        if(!gameById) throw res.status(httpStatus.NOT_FOUND);
        const id = gameById.id;
        const isFinished = gameById.isFinished;

        const gameFinished = await gamesService.finishGameById({ id, homeTeamScore, awayTeamScore, isFinished });
        return res.status(httpStatus.OK).json(gameFinished);
    } catch (error) {
        if (error.name === 'FinishGameError') {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }

        return res.status(httpStatus.BAD_REQUEST).send(error);
    }
}