/*
  Warnings:

  - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."workout" DROP CONSTRAINT "workout_training_id_fkey";

-- DropTable
DROP TABLE "public"."workout";
