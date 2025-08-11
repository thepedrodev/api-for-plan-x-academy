/*
  Warnings:

  - Added the required column `quiz_id` to the `QuizAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."QuizAnswer" ADD COLUMN     "quiz_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."QuizAnswer" ADD CONSTRAINT "QuizAnswer_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
