-- CreateEnum
CREATE TYPE "Status" AS ENUM ('HIRED', 'FIRED');

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
CREATE TABLE "Reindeer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alignment" INTEGER NOT NULL,

    CONSTRAINT "Reindeer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calories" (
    "id" TEXT NOT NULL,
    "cookiesName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calories_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Letter" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reindeer_name_key" ON "Reindeer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Calories_cookiesName_key" ON "Calories"("cookiesName");

-- CreateIndex
CREATE UNIQUE INDEX "Elf_name_key" ON "Elf"("name");

-- AddForeignKey
ALTER TABLE "Address_history" ADD CONSTRAINT "Address_history_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
