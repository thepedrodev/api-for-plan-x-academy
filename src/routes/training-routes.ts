import { Router } from "express"
import { TrainingController } from "@/controllers/training-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "../middlewares/verify-user-authorization"

const trainingRoutes = Router()
const trainingController = new TrainingController()

trainingRoutes.use(ensureAuthenticated)

trainingRoutes.post("/", verifyUserAuthorization(["admin"]), trainingController.create)
trainingRoutes.get("/:id", trainingController.show)


export { trainingRoutes }