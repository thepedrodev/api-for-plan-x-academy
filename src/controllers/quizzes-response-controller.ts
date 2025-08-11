import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"
import { z } from "zod"

class QuizzesResponseController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        quiz_id: z.string().uuid(),
        user_id: z.string().uuid()
      })

      const { quiz_id, user_id } = bodySchema.parse(request.body)

      const quiz = await prisma.quiz.findFirst({ where: { id: quiz_id } })
      const user = await prisma.user.findFirst({ where: { id: user_id } })

      if (!quiz) {
        throw new AppError("This quiz dont exist")
      }

      if (!user) {
        throw new AppError("This user dont exist")
      }

      const responseUser = await prisma.quizResponse.create({
        data: { userId: user_id, quizId: quiz_id }
      })

      return response.json(responseUser)
    } catch (error) {
      next(error)
    }
  }
}

export { QuizzesResponseController }