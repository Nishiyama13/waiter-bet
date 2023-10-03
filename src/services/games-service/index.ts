import { Game } from "@prisma/client";
import { CreateGameInput } from "../../protocols";
import gamesRepository from "../../repositories/games-repository";
import { duplicateGameError, notFoundError } from "../../errors";

async function validateSinglePairOfTeamsInActiveGame(homeTeamName: string, awayTeamName:string) {
    const existingGame: Game = await gamesRepository.findActiveGamesWithTheSameTeamPair({ homeTeamName, awayTeamName });

    if(existingGame) {
        throw duplicateGameError();
    }
}
async function createGame({ homeTeamName, awayTeamName }: CreateGameInput): Promise <Game> {

    await validateSinglePairOfTeamsInActiveGame(homeTeamName, awayTeamName);

    const game = await gamesRepository.create({
        homeTeamName,
        awayTeamName,
    });
    return game;
}

async function getGames(): Promise<Game[]> {
    const games = await gamesRepository.findGames();
    if (!games) throw notFoundError();
    return games;
}

const gamesService = {
    createGame,
    getGames,
}

export default gamesService;