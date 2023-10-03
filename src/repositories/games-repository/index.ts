import { prisma } from 'config';
import { CreateGameInput } from '../../protocols';


async function create(data: CreateGameInput) {
    return prisma.game.create({
        data,
    });    
}

async function findActiveGamesWithTheSameTeamPair(data: CreateGameInput) {
    const findActiveGameWithTheSameTeamPair = await prisma.game.findFirst({
        where: {
            homeTeamName: data.homeTeamName,
            awayTeamName: data.awayTeamName,
            isFinished: false
        }
    });

    return findActiveGameWithTheSameTeamPair;
}

const gamesRepository = {
    create,
    findActiveGamesWithTheSameTeamPair,
}

export default gamesRepository;