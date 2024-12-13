/*
  Warnings:

  - Added the required column `address` to the `Elf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Elf" ADD COLUMN     "address" TEXT NOT NULL;
