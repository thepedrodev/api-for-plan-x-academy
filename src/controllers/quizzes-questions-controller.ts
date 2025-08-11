import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/app-error"
import { z } from "zod"

class QuizzesQuestionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        quiz_id: z.string().uuid(),
        options: z.record(z.any()),
        text: z.string().min(10),
      })

      const { text, options, quiz_id,  } = bodySchema.parse(request.body)

      const quiz = await prisma.quiz.findFirst({
        where: { id: quiz_id }
      })

      if (!quiz) {
        throw new AppError("This quiz dont exist")
      }

      const question = await prisma.quizQuestion.create({
        data: {
          quizId: quiz_id,
          text,
          options
        }
      })

      return response.json(question)
    } catch (error) {
      next(error)
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const quiz = await prisma.quiz.findFirst({
      where: { id },
      include: { questions: { select: { text: true, options: true } } }
    })

    if (!quiz) {
      throw new AppError("This quiz dont exist")
    }



    return response.json(quiz)
  }
}

export { QuizzesQuestionsController }