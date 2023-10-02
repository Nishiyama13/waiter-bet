import { prisma } from 'config';
import { CreateGameInput } from '../../protocols';


async function create(data: CreateGameInput) {
    return prisma.game.create({
        data,
    });    
}

const gamesRepository = {
    create,
}

export default gamesRepository;