import { Game } from "@prisma/client";
import { CreateGameInput } from "../../protocols";
import gamesRepository from "../../repositories/games-repository";

async function createGame({ homeTeamName, awayTeamName }: CreateGameInput): Promise <Game> {

    //await validateSinglePairOfTeamsInActiveGame(homeTeamName, awayTeamName);

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