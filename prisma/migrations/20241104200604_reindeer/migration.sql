-- CreateTable
CREATE TABLE "Reindeer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alignment" INTEGER NOT NULL,

    CONSTRAINT "Reindeer_pkey" PRIMARY KEY ("id")
);
