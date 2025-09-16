-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "payment" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Order Placed';
