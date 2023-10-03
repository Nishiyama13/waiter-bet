import { prisma } from 'config';
import { CreateParticipantInput } from '../../protocols';

async function create(data: CreateParticipantInput) {
    return prisma.participant.create({
        data,
    });    
}

async function findParticipantByName(name: string) {
    return prisma.participant.findFirst({
        where: {
            name,
        }
    })
}

async function findParticipants() {
    return prisma.participant.findMany();    
}

async function findParticipantById(id:number) {
    return prisma.participant.findFirst({
        where: {
            id,
        },
        include: {
            bets: true,
        }
    });
}

async function upDateBalanceByParticipantId( id: number, balance: number ) {
    return prisma.participant.update({
        where: {
            id,
        },
        data: {
            balance: balance,
        },
    });
}

const participantsRepository = {
    create,
    findParticipantByName,
    findParticipants,
    findParticipantById,
    upDateBalanceByParticipantId,
}

export default participantsRepository;