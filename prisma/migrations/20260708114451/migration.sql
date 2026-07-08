/*
  Warnings:

  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ACTIVE', 'BLOCKED');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "activeStatus" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "UserStatus";
