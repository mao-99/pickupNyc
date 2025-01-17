-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "borough" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 14,
    "pickup" BOOLEAN NOT NULL DEFAULT true,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sport" TEXT NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);
