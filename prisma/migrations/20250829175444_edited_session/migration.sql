-- AlterTable
ALTER TABLE "public"."Session" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en-US',
ADD COLUMN     "title" TEXT;
