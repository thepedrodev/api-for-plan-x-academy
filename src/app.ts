import express from "express"
import { routes } from "./routes/index"
import { errorHandling } from "./middlewares/error-handling"
import cors from "cors"

const app = express()

app.use(cors({ origin: [
  "https://plan-x-academy-by-pedro-davi.vercel.app",
  "https://plan-x-academy.onrender.com"] }))
app.use(express.json())
app.use(routes)

app.use(errorHandling)

export default app