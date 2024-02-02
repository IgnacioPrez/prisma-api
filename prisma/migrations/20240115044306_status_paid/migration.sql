/*
  Warnings:

  - You are about to drop the column `paid` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "paid";
