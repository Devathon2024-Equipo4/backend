/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Elf` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Elf` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stature` to the `Elf` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `Elf` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Elf" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "stature" DOUBLE PRECISION NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Elf_email_key" ON "Elf"("email");
