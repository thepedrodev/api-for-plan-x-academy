-- CreateTable
CREATE TABLE "public"."exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "mainMuscle" TEXT NOT NULL,
    "difficulty" "public"."ExperienceLevel" NOT NULL,
    "equipment" TEXT,
    "description" TEXT,
    "executionTips" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" TEXT,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ExerciseToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ExerciseToTraining_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ExerciseToTraining_B_index" ON "public"."_ExerciseToTraining"("B");

-- AddForeignKey
ALTER TABLE "public"."exercise" ADD CONSTRAINT "exercise_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExerciseToTraining" ADD CONSTRAINT "_ExerciseToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExerciseToTraining" ADD CONSTRAINT "_ExerciseToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
