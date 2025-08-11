import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prisma"
import { AppError } from "@/utils/app-error";
import { z } from "zod"
import { compare } from "bcrypt"
import { authConfig } from "../configs/auth"
import jwt from "jsonwebtoken"
import { env } from "../env"

class SessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        email: z.string().email(),
        password: z.string()
      })

      const { email, password } = bodySchema.parse(request.body)

      const user = await prisma.user.findFirst({
        where: { email }
      })

      if (!user) {
        throw new AppError("This email dont exist!")
      }

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        throw new AppError("Invalid email or password!")
      }

      const { expiresIn } = authConfig.jwt

      const token = jwt.sign({ role: user.role ?? "MEMBER" }, env.JWT_SECRET, {
        subject: user.id,
        expiresIn
      })

      const { password: hashedPassword, ...userWithoutPassword } = user

      return response.json({ token, user: userWithoutPassword })
    }
    catch (error) {
      next(error)
    }
  }
}

export { SessionsController }