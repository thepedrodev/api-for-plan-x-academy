import { Router } from "express"
import { TrainingController } from "@/controllers/training-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"

const trainingRoutes = Router()
const trainingController = new TrainingController()

trainingRoutes.use(ensureAuthenticated)

trainingRoutes.post("/", trainingController.create)
trainingRoutes.get("/:id", trainingController.show)


export { trainingRoutes }