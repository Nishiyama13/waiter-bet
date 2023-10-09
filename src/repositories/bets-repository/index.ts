import { prisma } from '../../config';
import { CreateBetInput } from '../../protocols';
import { createBetError } from '../../errors';

async function createBet({ homeTeamScore, awayTeamScore, amountBet, gameId, participantId }: CreateBetInput) {

    let createBetTransaction;

    try {
        createBetTransaction = await prisma.$transaction([
            prisma.bet.create({
                data: { 
                    homeTeamScore, 
                    awayTeamScore, 
                    amountBet, 
                    gameId, 
                    participantId,
                 },
            }),
            prisma.participant.update({
                where: {
                    id: participantId,
                },
                data: {
                    balance: {
                        decrement: amountBet,
                    },
                },
            }),
        ]);
    }  catch (error) {
        throw createBetError('Your bet cannot be placed, please try later!');
    }
    return createBetTransaction; 
}

async function findBets() {
    return prisma.bet.findMany();    
}

const betsRepository = {
    createBet,
    findBets,
}

export default betsRepository;