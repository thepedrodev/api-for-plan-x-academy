/*
  Warnings:

  - You are about to drop the `QuizAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."QuizAnswer" DROP CONSTRAINT "QuizAnswer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."QuizAnswer" DROP CONSTRAINT "QuizAnswer_quizResponseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."QuizAnswer" DROP CONSTRAINT "QuizAnswer_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."QuizQuestion" DROP CONSTRAINT "QuizQuestion_quiz_id_fkey";

-- DropTable
DROP TABLE "public"."QuizAnswer";

-- DropTable
DROP TABLE "public"."QuizQuestion";

-- CreateTable
CREATE TABLE "public"."quiz_question" (
    "id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "options" JSONB,

    CONSTRAINT "quiz_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quiz_answer" (
    "id" TEXT NOT NULL,
    "quiz_response_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "quiz_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."quiz_question" ADD CONSTRAINT "quiz_question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_answer" ADD CONSTRAINT "quiz_answer_quiz_response_id_fkey" FOREIGN KEY ("quiz_response_id") REFERENCES "public"."quiz_response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quiz_answer" ADD CONSTRAINT "quiz_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
