-- CreateTable
CREATE TABLE "public"."workout" (
    "id" TEXT NOT NULL,
    "training_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER,
    "duration" INTEGER,
    "rest" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."workout" ADD CONSTRAINT "workout_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "public"."training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
