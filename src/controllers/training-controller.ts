import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/app-error"

class TrainingController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        user_id: z.string().uuid(),
        training_type: z.enum(["low", "high"]),
        routine: z.record(z.any())
      })

      const { user_id, training_type, routine } = bodySchema.parse(request.body)

      const user = await prisma.user.findFirst({
        where: { id: user_id }
      })

      if (!user) {
        throw new AppError("This user dont exist")
      }

      const training = await prisma.training.create({
        data: {
          userId: user.id,
          routine,
          type: training_type
        }
      })

      return response.json(training)
    } catch (error) {
      next(error)
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const user = prisma.user.findFirst({
      where: {id}
    })

    if(!user){
      throw new AppError("This user dont exist!")
    }


    const userTraining = await prisma.training.findFirst({
      where:{
        userId: id
      },
      select: {type:true, routine:true}
    })

    return response.json(userTraining)
  }
}

export { TrainingController }