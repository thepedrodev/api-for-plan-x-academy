import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import { hash } from "bcrypt"
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";


class UsersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().min(6),
        email: z.string().email(),
        password: z.string().min(6)
      })

      const { name, email, password } = bodySchema.parse(request.body)


      const usersWithSameEmail = await prisma.user.findFirst({ where: { email } })

      if (usersWithSameEmail) {
        throw new AppError("User with same email already exist")
      }

      const saltRounds = 8
      const passwordHashsed = await hash(password, saltRounds)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHashsed
        }
      })

      const { password: _, ...userWithoutPassword } = user;

      return response.status(201).json(userWithoutPassword);
    } catch (error) {
      next(error)
    }

  }
}

export { UsersController }