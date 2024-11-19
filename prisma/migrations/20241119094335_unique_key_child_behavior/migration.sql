/*
  Warnings:

  - A unique constraint covering the columns `[alignmentId,reindeerId]` on the table `AlignmentReindeer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[childId,behaviorId]` on the table `ChildBehavior` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AlignmentReindeer_alignmentId_order_key";

-- CreateIndex
CREATE UNIQUE INDEX "AlignmentReindeer_alignmentId_reindeerId_key" ON "AlignmentReindeer"("alignmentId", "reindeerId");

-- CreateIndex
CREATE UNIQUE INDEX "ChildBehavior_childId_behaviorId_key" ON "ChildBehavior"("childId", "behaviorId");
