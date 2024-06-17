/*
  Warnings:

  - The primary key for the `Anime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `anime_id` on the `Anime` table. All the data in the column will be lost.
  - The required column `id` was added to the `Anime` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "User_favorites" DROP CONSTRAINT "User_favorites_anime_id_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_pkey",
DROP COLUMN "anime_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Anime_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "User_favorites" ADD CONSTRAINT "User_favorites_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
