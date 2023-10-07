import { prisma } from 'config';
import { CreateGameInput, FinishGameInput } from '../../protocols';
import { finishGameError } from '../../errors';
import { Bet, Game } from '@prisma/client';


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

async function upDateFinishedGameById(data: FinishGameInput) {
    let finishGameTransaction;
    let updateGamePromise:Game;
    const bets = data.bets;
    let totalBetAmount = 0;
    let totalWinningAmount = 0;

    try {
        await prisma.$transaction(async (prisma) => {
            updateGamePromise = await prisma.game.update({
                where: { id: data.id },
                data: {
                    homeTeamScore: data.homeTeamScore,
                    awayTeamScore: data.awayTeamScore,
                    isFinished: true,
                },
            });

            for (const bet of bets) {
                const statusResult = await changeStatus(bet, data.homeTeamScore, data.awayTeamScore);
                await prisma.bet.update({
                    where: {
                        id: statusResult.id,
                    },
                    data: {
                        status: statusResult.status,
                    },
                });

                totalBetAmount += bet.amountBet;
                if (statusResult.status === 'WON') {
                    totalWinningAmount += bet.amountBet;
                }
            }
            
            for (const bet of bets) {
                const evaluetionResult = await evaluateBet(bet, data.homeTeamScore, data.awayTeamScore, totalBetAmount, totalWinningAmount);
                await prisma.bet.update({
                    where: {
                        id: evaluetionResult.id,
                    },
                    data: {
                        status: evaluetionResult.status,
                        amountWon: evaluetionResult.amountWon,
                    },
                });

                if (evaluetionResult.status === 'WON') {
                    const participant = await prisma.participant.findUnique({
                        where: { id: bet.participantId },
                    });
                    const newBalance = participant.balance + evaluetionResult.amountWon;
                    await prisma.participant.update({
                        where: { id: bet.participantId },
                        data: { balance: newBalance },
                    });
                }
            }
        });
        finishGameTransaction = true;
        return updateGamePromise;  
    } catch (error) {
        throw finishGameError('Unable to close the game');
    }  
}

async function evaluateBet(bet: Bet, homeTeamScore: number, awayTeamScore: number, totalBetAmount: number, totalWinningAmount: number) {
 
    const hauseEdge = 0.3;

    const status = bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore ? 'WON' : 'LOST';

    let amountWon = 0;
    if (status === 'WON') {
        amountWon = totalWinningAmount === 0 ? 0 : ((bet.amountBet / totalWinningAmount) * totalBetAmount * (1 - hauseEdge))
    }

    const id = bet.id;
    const roundedValue = Math.floor(amountWon)

    return { id, status, amountWon: roundedValue };
}

async function changeStatus(bet: Bet, homeTeamScore: number, awayTeamScore: number) {

    const status = bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore ? 'WON' : 'LOST';
    const id = bet.id;
    
    return { id, status };
}

const gamesRepository = {
    create,
    findActiveGamesWithTheSameTeamPair,
    findGames,
    findGameById,
    upDateFinishedGameById,
}

export default gamesRepository;