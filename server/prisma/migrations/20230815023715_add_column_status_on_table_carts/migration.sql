/*
  Warnings:

  - You are about to alter the column `status` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `carts` MODIFY `status` ENUM('Checkout', 'Pending') NOT NULL;
