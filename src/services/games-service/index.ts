import { Game } from "@prisma/client";
import { CreateGameInput, GameType } from "../../protocols";
import gamesRepository from "../../repositories/games-repository";
import { duplicateGameError } from "../../errors";

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

const gamesService = {
    createGame,
}

export default gamesService;