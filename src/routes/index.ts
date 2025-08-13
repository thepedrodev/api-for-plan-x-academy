import { Router } from "express"
import { usersRoutes } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { trainingRoutes } from "./training-routes"
import { quizzesRoutes } from "./quizzes-routes"
import { historyProgressRoutes } from "./history-routes"
import {workoutRoutes} from "./workout-routes"

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/training", trainingRoutes)
routes.use("/quiz", quizzesRoutes)
routes.use("/progress", historyProgressRoutes)
routes.use("/workouts", workoutRoutes)

export { routes }