import { Router } from "express";
import { UserActivitiesController } from "@/controllers/user-activities-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

export const userActivitiesRoutes = Router()
const userActivitiesController = new UserActivitiesController()

userActivitiesRoutes.use(verifyUserAuthorization)

userActivitiesRoutes.post("/", userActivitiesController.create)