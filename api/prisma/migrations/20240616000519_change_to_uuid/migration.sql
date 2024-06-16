/*
  Warnings:

  - The primary key for the `Anime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User_favorites" DROP CONSTRAINT "User_favorites_anime_id_fkey";

-- DropForeignKey
ALTER TABLE "User_favorites" DROP CONSTRAINT "User_favorites_user_id_fkey";

-- AlterTable
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_pkey",
ALTER COLUMN "anime_id" DROP DEFAULT,
ALTER COLUMN "anime_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Anime_pkey" PRIMARY KEY ("anime_id");
DROP SEQUENCE "Anime_anime_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "User_favorites" DROP CONSTRAINT "User_favorites_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "anime_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_favorites_pkey" PRIMARY KEY ("user_id", "anime_id");

-- AddForeignKey
ALTER TABLE "User_favorites" ADD CONSTRAINT "User_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_favorites" ADD CONSTRAINT "User_favorites_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("anime_id") ON DELETE RESTRICT ON UPDATE CASCADE;
