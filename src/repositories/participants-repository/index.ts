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

const participantsRepository = {
    create,
    findParticipantByName,
    findParticipants,
}

export default participantsRepository;