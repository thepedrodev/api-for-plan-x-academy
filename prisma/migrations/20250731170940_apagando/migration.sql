/*
  Warnings:

  - You are about to drop the column `type` on the `QuizQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."QuizQuestion" DROP COLUMN "type";

-- DropEnum
DROP TYPE "public"."QuestionType";
