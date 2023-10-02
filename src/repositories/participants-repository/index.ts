import { prisma } from 'config';
import { CreateParticipantInput } from '../../protocols';
async function create(data: CreateParticipantInput) {
    return prisma.participant.create({
        data,
    });    
}

const participantsRepository = {
    create,
}

export default participantsRepository;