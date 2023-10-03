import { prisma } from 'config';
import { CreateBetInput } from '../../protocols';


async function create(data: CreateBetInput) {
    return prisma.bet.create({
        data,
    });    
}

const betsRepository = {
    create,
}

export default betsRepository;