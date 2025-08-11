/*
  Warnings:

  - You are about to drop the column `response_id` on the `QuizAnswer` table. All the data in the column will be lost.
  - You are about to drop the `QuizResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."QuizAnswer" DROP CONSTRAINT "QuizAnswer_response_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."QuizResponse" DROP CONSTRAINT "QuizResponse_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."QuizResponse" DROP CONSTRAINT "QuizResponse_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."QuizAnswer" DROP COLUMN "response_id";

-- DropTable
DROP TABLE "public"."QuizResponse";
