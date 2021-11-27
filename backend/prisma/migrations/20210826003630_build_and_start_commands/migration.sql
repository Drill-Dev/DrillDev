/*
  Warnings:

  - You are about to drop the column `submissionCode` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `startCommand` to the `Drill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startCommand` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drill" ADD COLUMN     "buildCommand" TEXT,
ADD COLUMN     "startCommand" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "submissionCode",
ADD COLUMN     "buildCommand" TEXT,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "startCommand" TEXT NOT NULL;
