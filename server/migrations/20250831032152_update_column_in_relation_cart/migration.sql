/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_pkey",
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId", "productId", "size");
