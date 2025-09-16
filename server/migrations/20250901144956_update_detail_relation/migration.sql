/*
  Warnings:

  - The primary key for the `Detail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Detail" DROP CONSTRAINT "Detail_pkey",
ADD CONSTRAINT "Detail_pkey" PRIMARY KEY ("productId", "orderId", "size");
