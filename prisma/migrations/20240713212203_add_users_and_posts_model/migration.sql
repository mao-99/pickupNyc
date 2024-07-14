/*
  Warnings:

  - You are about to drop the column `borough` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `pickup` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `Games` table. All the data in the column will be lost.
  - Added the required column `title` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "borough",
DROP COLUMN "pickup",
DROP COLUMN "price",
DROP COLUMN "sport",
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rules" TEXT NOT NULL DEFAULT 'Create Rules',
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "total" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" INTEGER,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_parentId_key" ON "Posts"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_id_fkey" FOREIGN KEY ("id") REFERENCES "Posts"("parentId") ON DELETE RESTRICT ON UPDATE CASCADE;
