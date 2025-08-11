/*
  Warnings:

  - The values [text] on the enum `QuestionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."QuestionType_new" AS ENUM ('single', 'multiple');
ALTER TABLE "public"."QuizQuestion" ALTER COLUMN "type" TYPE "public"."QuestionType_new" USING ("type"::text::"public"."QuestionType_new");
ALTER TYPE "public"."QuestionType" RENAME TO "QuestionType_old";
ALTER TYPE "public"."QuestionType_new" RENAME TO "QuestionType";
DROP TYPE "public"."QuestionType_old";
COMMIT;
