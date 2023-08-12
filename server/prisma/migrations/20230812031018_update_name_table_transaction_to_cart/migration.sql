/*
  Warnings:

  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_productid_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_userid_fkey`;

-- DropTable
DROP TABLE `transactions`;

-- CreateTable
CREATE TABLE `carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_number` INTEGER NOT NULL,
    `userid` INTEGER NOT NULL,
    `productid` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `carts_order_number_key`(`order_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_productid_fkey` FOREIGN KEY (`productid`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
