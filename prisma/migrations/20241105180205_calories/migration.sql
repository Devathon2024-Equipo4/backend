/*
  Warnings:

  - The primary key for the `Reindeer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `address_history` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Reindeer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "address_history" DROP CONSTRAINT "address_history_address_id_fkey";

-- AlterTable
ALTER TABLE "Reindeer" DROP CONSTRAINT "Reindeer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Reindeer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Reindeer_id_seq";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "address_history";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address_history" (
    "id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calories" (
    "id" TEXT NOT NULL,
    "cookiesName" TEXT NOT NULL,
    "quantiyCookies" INTEGER NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reindeer_name_key" ON "Reindeer"("name");

-- AddForeignKey
ALTER TABLE "Address_history" ADD CONSTRAINT "Address_history_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
