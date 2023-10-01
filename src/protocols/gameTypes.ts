import { Bet } from './betTypes';

export type Game = {
    id: number,
    createdAt: string,
    updatedAt: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: number,
    awayTeamScore: number,
    isFinished: boolean,
    bets: Bet[]
}

export type CreateGameInput = {
    homeTeamName: string,
    awayTeamName: string
}

export type GameResponse = Omit<Game, 'bets'>