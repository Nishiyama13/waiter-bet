import { faker } from '@faker-js/faker';
import { prisma } from '@/config'
import { Game } from '@prisma/client';

export async function createGame(params: Partial<Game> = {}): Promise<Game> {
    const homeTeamName = faker.company.name();
    const awayTeamName = faker.company.name();
    
    return prisma.game.create({
        data: {
            homeTeamName,
            awayTeamName,
        }
    });
}
