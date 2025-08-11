import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"

class QuizzersAnswersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        question_id: z.string().uuid(),
        answer: z.string(),
        quiz_response_id: z.string().uuid()
      })

      const { question_id, answer, quiz_response_id } = bodySchema.parse(request.body)

      const quizResponse = await prisma.quizResponse.findFirst({ where: { id: quiz_response_id } })

      const question = await prisma.quizQuestion.findFirst({
        where: { id: question_id }
      })

      if (!quizResponse) {
        throw new AppError("This quiz response don't exist ")
      }

      if (!question) {
        throw new AppError("This question don't exist.")
      }

      const answerUserForQuestion = await prisma.quizAnswer.create({
        data: { questionId: question_id, answer, quizResponseId: quiz_response_id }
      })

      return response.json(answerUserForQuestion)
    } catch (error) {
      next(error)
    }
  }
}

export { QuizzersAnswersController }
