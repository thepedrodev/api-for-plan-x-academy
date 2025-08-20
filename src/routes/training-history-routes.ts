import { Router } from "express";
import { TrainingHistoryController } from "@/controllers/training-history-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

export const trainingHistoryRoutes = Router()
const trainingHistoryController = new TrainingHistoryController()

trainingHistoryRoutes.use(ensureAuthenticated)

trainingHistoryRoutes.post("/", trainingHistoryController.create)