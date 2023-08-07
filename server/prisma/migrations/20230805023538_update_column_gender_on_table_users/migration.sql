/*
  Warnings:

  - You are about to drop the column `Gender` on the `users` table. All the data in the column will be lost.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `Gender`,
    ADD COLUMN `gender` ENUM('Male', 'Female') NOT NULL;
