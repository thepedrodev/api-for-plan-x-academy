-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "last_activity_date" TIMESTAMP(3),
ADD COLUMN     "max_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streak_count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."UserActivities" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "activity_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserActivities" ADD CONSTRAINT "UserActivities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
