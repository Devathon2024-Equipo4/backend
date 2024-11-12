-- CreateEnum
CREATE TYPE "ChildStatus" AS ENUM ('GOOD', 'BAD');

-- CreateTable
CREATE TABLE "Children" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ChildStatus" NOT NULL,

    CONSTRAINT "Children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Behavior" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Behavior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildBehavior" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "behaviorId" TEXT NOT NULL,
    "customPoints" INTEGER NOT NULL,

    CONSTRAINT "ChildBehavior_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChildBehavior" ADD CONSTRAINT "ChildBehavior_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Children"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildBehavior" ADD CONSTRAINT "ChildBehavior_behaviorId_fkey" FOREIGN KEY ("behaviorId") REFERENCES "Behavior"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
