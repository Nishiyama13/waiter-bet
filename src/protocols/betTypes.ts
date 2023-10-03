export type BetType = {
    id: number,
    createdAt: string,
    updatedAt: string,
    homeTeamScore: number,
    awayTeamScore: number,
    amountBet: number,
    gameId: number,
    participantId: number,
    status: string,
    amountWon: number | null;
}

export type CreateBetInput = {
    homeTeamScore: number,
    awayTeamScore: number,
    amountBet: number,
    gameId: number,
    participantId: number,
}