import { Router } from "express";
import { ExercisesController } from "@/controllers/exercises-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const exercisesRoutes = Router()
const exercisesController = new ExercisesController()

exercisesRoutes.use(ensureAuthenticated)

exercisesRoutes.post("/", exercisesController.create)

export { exercisesRoutes }