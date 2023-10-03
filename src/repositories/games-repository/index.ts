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

async function findGames() {
    return prisma.game.findMany();    
}

const gamesRepository = {
    create,
    findActiveGamesWithTheSameTeamPair,
    findGames,
}

export default gamesRepository;