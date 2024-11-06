/*
  Warnings:

  - You are about to drop the column `quantiyCookies` on the `Calories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cookiesName]` on the table `Calories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `Calories` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('HIRED', 'FIRED');

-- AlterTable
ALTER TABLE "Calories" DROP COLUMN "quantiyCookies",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Elf" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Elf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Elf_name_key" ON "Elf"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Calories_cookiesName_key" ON "Calories"("cookiesName");
