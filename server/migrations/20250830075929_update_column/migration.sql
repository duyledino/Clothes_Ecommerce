/*
  Warnings:

  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategory` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "subCategory" TEXT NOT NULL;
