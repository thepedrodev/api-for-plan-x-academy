import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/app-error"
import { z } from "zod"

class QuizzesController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        title: z.string().trim().min(6)
      })

      const { title } = bodySchema.parse(request.body)

      const quiz = await prisma.quiz.create({
        data: {
          title
        }
      })

      return response.json(quiz)
    } catch (error) {
      next(error)
    }
  }
}

export { QuizzesController }