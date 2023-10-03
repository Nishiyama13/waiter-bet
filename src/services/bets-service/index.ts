import { BetType, CreateBetInput } from "../../protocols";
import betsRepository from "../../repositories/bets-repository";
//import { insufficientFundsError } from "../../errors";
//import participantsService from "../participants-service";

/*async function validateBalance(amountBet:number, participantId: number) {
    const participantData: Bet = await participantsService.getParticipantsById(participantId);

    const valueAfterPurchase = participantData.balance - amountBet
    const roundedValue = Math.floor(valueAfterPurchase);

    if(valueAfterPurchase >= 0) {
        throw insufficientFundsError();
    }

}*/

/*async function validateSingleBetOfTheSameValue() {
    const existingBet: Game = await betsRepository.findActiveGamesWithTheSameTeamPair({  });

    if(existingBet) {
        throw duplicateBetError();
    }
}*/

async function createBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: CreateBetInput): Promise <BetType> {
    //await validateBalance({ amountBet, participantId });

    //await validateSingleBetOfTheSameValue();

    const bet = await betsRepository.create({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId });
    const createdAtString =bet.createdAt.toISOString();
    const updatedAtString =bet.updatedAt.toISOString();
    return {...bet, createdAt:createdAtString, updatedAt:updatedAtString};
}

const betsService = {
    createBet,
}

export default betsService;