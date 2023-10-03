import { BetType } from './betTypes';

export type Participant = {
    id: number,
    createdAt: string,
    updatedAt: string,
    name: string,
    balance: number,
    bets: BetType[] 
}

export type CreateParticipantInput = {
    name: string,
    balance: number,
}

export type ParticipantResponse = Omit<Participant, 'bets'>
