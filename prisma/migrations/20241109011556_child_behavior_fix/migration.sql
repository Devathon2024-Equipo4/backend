/*
  Warnings:

  - You are about to drop the column `points` on the `Behavior` table. All the data in the column will be lost.
  - You are about to drop the column `customPoints` on the `ChildBehavior` table. All the data in the column will be lost.
  - Added the required column `points` to the `ChildBehavior` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Behavior" DROP COLUMN "points";

-- AlterTable
ALTER TABLE "ChildBehavior" DROP COLUMN "customPoints",
ADD COLUMN     "points" INTEGER NOT NULL;
