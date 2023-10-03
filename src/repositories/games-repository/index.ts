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

async function findGameById(gameId:number) {
    return prisma.game.findFirst({
        where: {
            id: gameId,
        },
        include: {
            bets: true,
        }
    });
}

const gamesRepository = {
    create,
    findActiveGamesWithTheSameTeamPair,
    findGames,
    findGameById,
}

export default gamesRepository;