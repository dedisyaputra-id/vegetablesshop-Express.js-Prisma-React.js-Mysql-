/*
  Warnings:

  - Made the column `status` on table `carts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `carts` MODIFY `status` VARCHAR(20) NOT NULL;
