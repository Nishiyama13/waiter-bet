import { BetType, CreateBetInput } from "../../protocols";
import betsRepository from "../../repositories/bets-repository";
import { createBetError, insufficientFundsError } from "../../errors";
import participantsService from "../participants-service";
import { Bet, Game, Participant } from "@prisma/client";
import gamesService from "../games-service";

async function validateBalance(amountBet:number, participantId: number) {
    const participantData: Participant = await participantsService.getParticipantById(participantId);

    const valueAfterPurchase = participantData.balance - amountBet
    const roundedValue = Math.floor(valueAfterPurchase);

    if(roundedValue <= 0) {
        throw insufficientFundsError();
    }

    return roundedValue;
}

async function validateActiveGame(gameId: number) {
    const game: Game = await gamesService.getGameById(gameId);

    const gameIsFinished = game.isFinished;
    console.log(gameIsFinished);

    if (gameIsFinished) {
        throw createBetError('This game has already been finished');
    }
}

async function createBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: CreateBetInput): Promise <BetType> {
    await validateActiveGame(gameId);
    const newBalance: number = await validateBalance( amountBet, participantId );

    const bet = await betsRepository.create({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });
    if (!bet) {
        throw createBetError('Your bet cannot be placed, please try later!');
    }
    //update participant.balance to newBalance
    const formattedBet = formatBet(bet);
    return formattedBet;
}

function formatBet(bet: Bet) {
    const formattedBet: BetType = {
        id: bet.id,
        createdAt: bet.createdAt.toISOString(),
        updatedAt: bet.updatedAt.toISOString(),
        homeTeamScore: bet.homeTeamScore,
        awayTeamScore: bet.awayTeamScore,
        amountBet: bet.amountBet,
        gameId: bet.gameId,
        participantId: bet.participantId,
        status: bet.status,
        amountWon: bet.amountWon,
    };
    return formattedBet;
}

const betsService = {
    createBet,
}

export default betsService;