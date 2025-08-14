/*
  Warnings:

  - Made the column `description` on table `training` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `training` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."training" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
