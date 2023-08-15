-- AlterTable
ALTER TABLE `carts` MODIFY `status` ENUM('Checkout', 'Pending') NOT NULL DEFAULT 'Pending';
