import { Bet, Game } from "@prisma/client";
import { CreateGameInput, FinishGameInput, FinishGameType, GameType } from "../../protocols";
import gamesRepository from "../../repositories/games-repository";
import { duplicateGameError, finishGameError, notFoundError } from "../../errors";

async function validateSinglePairOfTeamsInActiveGame(homeTeamName: string, awayTeamName:string) {
    const existingGame: Game = await gamesRepository.findActiveGamesWithTheSameTeamPair({ homeTeamName, awayTeamName });

    if(existingGame) {
        throw duplicateGameError();
    }
}

function gameIsFinished(id:number, isFinished: boolean) {
    if (isFinished) throw finishGameError(`This game whith id ${id} has already been finished!`);
}

function formatGame(game: Game) {
    const formattedGame: GameType = {
        id: game.id,
        createdAt: game.createdAt.toISOString(),
        updatedAt: game.updatedAt.toISOString(),
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: game.homeTeamScore,
        awayTeamScore: game.awayTeamScore,
        isFinished: game.isFinished,
    };
    return formattedGame;
}

async function createGame({ homeTeamName, awayTeamName }: CreateGameInput): Promise <GameType> {

    await validateSinglePairOfTeamsInActiveGame(homeTeamName, awayTeamName);

    const game = await gamesRepository.create({
        homeTeamName,
        awayTeamName,
    });
    const formattedGame = formatGame(game);
    return formattedGame
}

async function getGames(): Promise<Game[]> {
    const games = await gamesRepository.findGames();
    if (!games) throw notFoundError();
    return games;
}

async function getGameById(gameId: number): Promise<Promise<Game & { bets: Bet[] }>> 
    {
    const game = await gamesRepository.findGameById(gameId);

    if (!game) throw notFoundError();
    return game; 
}

async function finishGameById({ id, homeTeamScore, awayTeamScore }: FinishGameInput): Promise <GameType> {
    const gameById = await getGameById(id);
    if(!gameById) throw notFoundError()
    gameIsFinished(id ,gameById.isFinished);

    const game = await gamesRepository.upDateGameById({
        id: gameById.id,
        homeTeamScore,
        awayTeamScore,
        isFinished: gameById.isFinished,
    });

    if (!game) throw finishGameError();
    const formattedGame = formatGame(game);
    return formattedGame
}

const gamesService = {
    createGame,
    getGames,
    getGameById,
    finishGameById,
}

export default gamesService;