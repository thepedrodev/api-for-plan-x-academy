import { Request, Response, NextFunction } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/app-error"

class TrainingController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        user_id: z.string().uuid(),
        training_type: z.enum(["low", "high"]),
        workouts: z.array(
          z.object({
            day: z.string(),
            exercises: z.array(
              z.object({
                name: z.string(),
                sets: z.number().int(),
                reps: z.number().int().optional(),
                load: z.number().optional(),
                rest: z.number().optional()
              })
            )
          })
        )
      })

      const { user_id, training_type, workouts, description,title } = bodySchema.parse(request.body)

      const user = await prisma.user.findFirst({
        where: { id: user_id }
      })

      if (!user) {
        throw new AppError("This user dont exist")
      }

      const training = await prisma.training.create({
        data: {
          userId: user.id,
          workouts,
          type: training_type,
          title,
          description
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

    const training = await prisma.training.findFirst({
      where: {id},
      select:{title:true, description:true, type:true, routine:true, createdAt:true}
    })

    if(!training){
      throw new AppError("This user dont exist!")
    }

    return response.json(training)
  }
}

export { TrainingController }