import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/app-error"

export class TrainingHistoryController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        user_id: z.string().uuid(),
        training_id: z.string().uuid()
      })

      const { user_id, training_id } = bodySchema.parse(request.body)

      const user = await prisma.user.findFirst({
        where: { id: user_id }
      })

      if (!user) {
        throw new AppError("This user dont exist!")
      }

      const training = await prisma.training.findFirst({
        where: { id: training_id }
      })

      if (!training) {
        throw new AppError("This training dont exist!")
      }

      const trainingHistory = await prisma.trainingHistory.create({
        data:{userId: user_id, trainingId: training_id}
      })

      return response.json(trainingHistory)
    } catch (error) {
      next(error)
    }

  }
}