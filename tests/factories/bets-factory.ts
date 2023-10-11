import { faker } from '@faker-js/faker';
import { prisma } from '@/config'
import { Bet } from '@prisma/client';

export async function createBet( homeTeamScore: number,awayTeamScore: number, amountBet:number, gameId:number, participantId: number ): Promise<Bet> {
    return prisma.bet.create({
        data: {
            homeTeamScore,
            awayTeamScore,         
            amountBet,
            gameId,
            participantId,
        }
    })
}

export async function createAleatoryBet(params: Partial<Bet> = {}): Promise<Bet> {
    const homeTeamScore = faker.number.int({max: 20});
    const awayTeamScore = faker.number.int({max: 20});        
    const amountBet = 1000;
    const gameId = 1;
    const participantId = 2;
    return prisma.bet.create({
        data: {
            homeTeamScore,
            awayTeamScore,         
            amountBet,
            gameId,
            participantId,
        }
    })
}
