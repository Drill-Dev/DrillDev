-- DropIndex
DROP INDEX "RefreshToken.token_unique";

-- AlterTable
ALTER TABLE "RefreshToken" ADD PRIMARY KEY ("token");
