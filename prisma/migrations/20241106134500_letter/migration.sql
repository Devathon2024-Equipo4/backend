/*
  Warnings:

  - You are about to drop the column `quantiyCookies` on the `Calories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cookiesName]` on the table `Calories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `Calories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calories" DROP COLUMN "quantiyCookies",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Letter" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calories_cookiesName_key" ON "Calories"("cookiesName");
