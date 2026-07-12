-- AlterTable
ALTER TABLE "technician_profiles" ADD COLUMN     "availableFrom" TEXT,
ADD COLUMN     "availableTo" TEXT,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
