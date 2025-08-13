import { Router } from "express";
import {WorkoutController} from "../controllers/workout-controller"

export const workoutRoutes = Router()
const workoutController = new WorkoutController()

workoutRoutes.post("/", workoutController.create)