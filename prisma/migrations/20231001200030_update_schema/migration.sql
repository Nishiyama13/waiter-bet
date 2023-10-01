-- AlterTable
ALTER TABLE "bets" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "games" ALTER COLUMN "homeTeamScore" SET DEFAULT 0,
ALTER COLUMN "awayTeamScore" SET DEFAULT 0,
ALTER COLUMN "isFinished" SET DEFAULT false;
