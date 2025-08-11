import { Router } from "express"
import { HistoryProgressController } from "@/controllers/history-progress-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization"

const historyProgressRoutes = Router()
const historyProgressController = new HistoryProgressController()

historyProgressRoutes.use(ensureAuthenticated)

historyProgressRoutes.post("/", historyProgressController.create)
historyProgressRoutes.get("/:id", historyProgressController.show)

export { historyProgressRoutes }