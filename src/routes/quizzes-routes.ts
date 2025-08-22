import { Router } from "express"
import { QuizzesController } from "@/controllers/quizzes-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"
import { QuizzesQuestionsController } from "@/controllers/quizzes-questions-controller"
import { QuizzersAnswersController } from "@/controllers/quizzes-answers-controller"
import { QuizzesResponseController } from "@/controllers/quizzes-response-controller"

const quizzesRoutes = Router()
const quizzesController = new QuizzesController()
const quizzesQuestionsController = new QuizzesQuestionsController()
const quizzersAnswersController = new QuizzersAnswersController()
const quizzesResponseController = new QuizzesResponseController()

quizzesRoutes.post("/questions/answers", quizzersAnswersController.create)

quizzesRoutes.use(ensureAuthenticated)
quizzesRoutes.get("/questions/:id", quizzesQuestionsController.show)


quizzesRoutes.post("/questions/response", quizzesResponseController.create)

quizzesRoutes.use(verifyUserAuthorization(["admin"]))

quizzesRoutes.post("/", quizzesController.create)
quizzesRoutes.post("/questions", quizzesQuestionsController.create)


export { quizzesRoutes }