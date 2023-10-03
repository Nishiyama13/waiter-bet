import { BetType, CreateBetInput } from "../../protocols";
import betsRepository from "../../repositories/bets-repository";
import { insufficientFundsError } from "../../errors";
import participantsService from "../participants-service";
import { Bet, Participant } from "@prisma/client";

async function validateBalance(amountBet:number, participantId: number) {
    const participantData: Participant = await participantsService.getParticipantById(participantId);

    const valueAfterPurchase = participantData.balance - amountBet
    const roundedValue = Math.floor(valueAfterPurchase);

    if(roundedValue <= 0) {
        throw insufficientFundsError();
    }
}

/*async function validateSingleBetOfTheSameValue() {
    const existingBet: Game = await betsRepository.findActiveGamesWithTheSameTeamPair({  });

    if(existingBet) {
        throw duplicateBetError();
    }
}*/

async function createBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: CreateBetInput): Promise <BetType> {
    await validateBalance( amountBet, participantId );

    //await validateSingleBetOfTheSameValue();

    const bet = await betsRepository.create({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });
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