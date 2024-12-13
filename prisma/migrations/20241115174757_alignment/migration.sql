/*
  Warnings:

  - You are about to drop the column `url` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `alignment` on the `Reindeer` table. All the data in the column will be lost.
  - You are about to drop the `Address_history` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Reindeer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address_history" DROP CONSTRAINT "Address_history_address_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "url",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reindeer" DROP COLUMN "alignment",
ADD COLUMN     "description" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address_history";

-- CreateTable
CREATE TABLE "Alignment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlignmentReindeer" (
    "id" TEXT NOT NULL,
    "alignmentId" TEXT NOT NULL,
    "reindeerId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "AlignmentReindeer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlignmentReindeer_alignmentId_order_key" ON "AlignmentReindeer"("alignmentId", "order");

-- AddForeignKey
ALTER TABLE "AlignmentReindeer" ADD CONSTRAINT "AlignmentReindeer_alignmentId_fkey" FOREIGN KEY ("alignmentId") REFERENCES "Alignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlignmentReindeer" ADD CONSTRAINT "AlignmentReindeer_reindeerId_fkey" FOREIGN KEY ("reindeerId") REFERENCES "Reindeer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
