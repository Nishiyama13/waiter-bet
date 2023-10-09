import { PrismaClient } from '@prisma/client' 

const prisma = new PrismaClient();

async function main() {
    let participant = await prisma.participant.findFirst();
    if (!participant) {
        participant = await prisma.participant.create({
            data: {
                name: "Waiter Bet",
                balance: 0,
            },
        });
    }

    console.log( {participant });    
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
