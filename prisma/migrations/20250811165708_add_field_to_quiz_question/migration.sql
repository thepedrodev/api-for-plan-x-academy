/*
  Warnings:

  - Added the required column `field` to the `quiz_question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Field" AS ENUM ('sex', 'height', 'weight', 'biotype', 'deficiencyOrLimitation', 'objective', 'timeExpectedForResult', 'muscleFocus', 'alreadyTrained', 'experienceLevel', 'daysPerWeek', 'avaliableTimePerWorkout', 'trainingSchedule');

-- AlterTable
ALTER TABLE "public"."quiz_question" ADD COLUMN     "field" "public"."Field" NOT NULL;
