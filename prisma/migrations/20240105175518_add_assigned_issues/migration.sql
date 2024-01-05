-- AlterTable
ALTER TABLE `issue` ADD COLUMN `AssignedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_AssignedToUserId_fkey` FOREIGN KEY (`AssignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
