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

const participantsRepository = {
    create,
    findParticipantByName,
}

export default participantsRepository;