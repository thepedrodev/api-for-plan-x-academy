-- AddForeignKey
ALTER TABLE "public"."TrainingHistory" ADD CONSTRAINT "TrainingHistory_training_id_fkey" FOREIGN KEY ("training_id") REFERENCES "public"."training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
