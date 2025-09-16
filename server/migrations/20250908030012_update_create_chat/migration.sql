/*
  Warnings:

  - You are about to drop the column `userId` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."Chat_User" (
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Chat_User_pkey" PRIMARY KEY ("chatId","userId")
);

-- AddForeignKey
ALTER TABLE "public"."Chat_User" ADD CONSTRAINT "Chat_User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_User" ADD CONSTRAINT "Chat_User_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;
