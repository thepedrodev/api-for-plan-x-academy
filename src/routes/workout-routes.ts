import { Router } from "express";
import { WorkoutController } from "../controllers/workout-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"

export const workoutRoutes = Router()
const workoutController = new WorkoutController()

workoutRoutes.use(ensureAuthenticated)

workoutRoutes.post("/", workoutController.create)