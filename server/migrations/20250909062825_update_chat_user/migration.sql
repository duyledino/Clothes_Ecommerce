/*
  Warnings:

  - The primary key for the `Chat_User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Chat_User` table. All the data in the column will be lost.
  - Added the required column `userIdFrom` to the `Chat_User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdTo` to the `Chat_User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat_User" DROP CONSTRAINT "Chat_User_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Chat_User" DROP CONSTRAINT "Chat_User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userIdFrom" TEXT NOT NULL,
ADD COLUMN     "userIdTo" TEXT NOT NULL,
ADD CONSTRAINT "Chat_User_pkey" PRIMARY KEY ("chatId", "userIdFrom", "userIdTo");

-- AddForeignKey
ALTER TABLE "public"."Chat_User" ADD CONSTRAINT "Chat_User_userIdFrom_fkey" FOREIGN KEY ("userIdFrom") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat_User" ADD CONSTRAINT "Chat_User_userIdTo_fkey" FOREIGN KEY ("userIdTo") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
