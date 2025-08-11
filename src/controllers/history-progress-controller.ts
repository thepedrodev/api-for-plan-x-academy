import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { AppError } from "@/utils/app-error"
import { prisma } from "@/database/prisma"

class HistoryProgressController {
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      weight: z.number()
    })

    const { user_id, weight } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { id: user_id } })

    if (!user) {
      throw new AppError("This user don't exist")
    }

    const history = await prisma.historyProgress.create({
      data: { userId: user_id, weight }
    })

    return response.json(history)
  }

  async show(request: Request, response: Response, next: NextFunction) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const userHistory = await prisma.historyProgress.findMany({
      where:{userId:id}, orderBy:{createdAt: "desc"}
    })

    return response.json(userHistory)
  }
}

export { HistoryProgressController }