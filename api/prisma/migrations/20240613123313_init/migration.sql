-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "anime_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "studio" TEXT,
    "date_aired" TIMESTAMP(3),

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("anime_id")
);

-- CreateTable
CREATE TABLE "User_favorites" (
    "user_id" INTEGER NOT NULL,
    "anime_id" INTEGER NOT NULL,

    CONSTRAINT "User_favorites_pkey" PRIMARY KEY ("user_id","anime_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User_favorites" ADD CONSTRAINT "User_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_favorites" ADD CONSTRAINT "User_favorites_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "Anime"("anime_id") ON DELETE RESTRICT ON UPDATE CASCADE;
