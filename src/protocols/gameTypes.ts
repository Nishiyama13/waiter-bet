import { Bet } from "@prisma/client"

export type GameType = {
    id: number,
    createdAt: string,
    updatedAt: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: number,
    awayTeamScore: number,
    isFinished: boolean,
    bets?: Bet[]
}

export type CreateGameInput = {
    homeTeamName: string,
    awayTeamName: string
}

export type FinishGameInput = {
    id?: number,
    homeTeamScore: number,
    awayTeamScore: number,
    isFinished?: boolean,
    bets?: Bet[]
}

export type FinishGameType = Pick<GameType, 'id' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>;