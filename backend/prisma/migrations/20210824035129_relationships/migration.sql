/*
  Warnings:

  - You are about to drop the column `judgingOptions` on the `Drill` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Drill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Drill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judgingExecutor` to the `Drill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitterId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drill" DROP COLUMN "judgingOptions",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "exposedPorts" TEXT[],
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "judgingExecutor" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "submitterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD FOREIGN KEY ("submitterId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drill" ADD FOREIGN KEY ("creatorId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
