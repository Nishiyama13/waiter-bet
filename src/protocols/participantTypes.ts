export type ParticipantType = {
    id: number,
    createdAt: string,
    updatedAt: string,
    name: string,
    balance: number
}

export type CreateParticipantInput = {
    name: string,
    balance: number,
}

export type ParticipantResponse = Omit<ParticipantType, 'bets'>
