import { Request, Response, NextFunction } from "express"
import { prisma } from "../database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/app-error"

export class WorkoutController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        training_id: z.string().uuid(),
        name: z.string(),
        sets: z.number(),
        reps: z.number(),
        duration: z.number(),
        rest: z.number()
      })

      const { training_id, name, sets, reps, duration, rest } = bodySchema.parse(request.body)

      const training = await prisma.training.findFirst({where:{id: training_id}})

      if(!training){
        throw new AppError("This training don't exist!")
      }

      const workout = await prisma.workout.create({
        data: {name, sets, duration, reps, rest, trainingId: training_id}
      })

      return response.status(201).json(workout)
    } catch (error) {
      next(error)
    }
  }
}