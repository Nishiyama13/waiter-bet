export type GameType = {
    id: number,
    createdAt: string,
    updatedAt: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: number,
    awayTeamScore: number,
    isFinished: boolean,
}

export type CreateGameInput = {
    homeTeamName: string,
    awayTeamName: string
}

export type FinishGameInput = {
    id?: number,
    homeTeamScore: number,
    awayTeamScore: number,
    isFinished?: boolean
}

export type FinishGameType = Pick<GameType, 'id' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>;