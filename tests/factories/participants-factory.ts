import { faker } from '@faker-js/faker';
import { prisma } from '@/config'
import { Participant } from '@prisma/client';

export async function createParticipant(params: Partial<Participant> = {}): Promise<Participant> {

    return prisma.participant.create({
        data: {
            name: params.name || faker.person.fullName(),
            balance: params.balance || faker.number.int({ min: 1000, max:10000}),
        },
    });
}

export async function createWaiterBet() {
    let participant = await prisma.participant.findFirst();
    if (!participant) {
        participant = await prisma.participant.create({
            data: {
                name: "Waiter Bet",
                balance: 0,
            },
        });
    }

    console.log( { participant });    
}