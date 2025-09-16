/*
  Warnings:

  - Added the required column `content` to the `Chat_Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Chat_Message" ADD COLUMN     "content" TEXT NOT NULL;
