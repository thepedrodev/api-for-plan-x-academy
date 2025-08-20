import { Request, Response, NextFunction } from "express"
import { prisma } from "../database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/app-error"

export class ExercisesController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {

      const bodySchema = z.object({
        name: z.string(),
        category: z.enum(["peito", "costas", "ombros", "biceps", "triceps", "pernas", "panturrilhas", "abdomen"]),
        mainMuscle: z.string(),
        difficulty: z.enum(["Iniciante", "Intermediário", "Avançado"]),
        equipment: z.string(),
        description: z.string(),
        execution_tips: z.string(),
        createdById: z.string().uuid()
      })

      const { name, category, mainMuscle, difficulty, equipment, description, execution_tips, createdById } = bodySchema.parse(request.body)

      const user = await prisma.user.findFirst({ where: { id: createdById } })

      if (!user) {
        throw new AppError("This user dont exist")
      }

      const exercise = await prisma.exercise.create({
        data: {
          name, category, mainMuscle, difficulty, equipment, description, executionTips: execution_tips, createdById
        }
      })

      return response.json(exercise)
    } catch (error) {
      next(error)
    }
  }

  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })

      const { id } = paramsSchema.parse(request.params)

      const exercises = await prisma.exercise.findMany({
        where: {
          createdById: id
        }
      })

      return response.json(exercises)
    } catch (error) {
      next(error)
    } 

  }
}
