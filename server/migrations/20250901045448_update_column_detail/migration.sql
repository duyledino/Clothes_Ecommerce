/*
  Warnings:

  - Added the required column `size` to the `Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Detail" ADD COLUMN     "size" TEXT NOT NULL;
