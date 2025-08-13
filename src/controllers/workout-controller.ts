import {Request, Response, NextFunction} from "express"
import {prisma} from "../database/prisma"
import {z} from "zod"
import { AppError } from "@/utils/app-error"

export class Workout{
  async create(request:Request, response:Response, next:NextFunction){
    try {
      const bodySchema = z.object({})

      return response.json("ok")
    } catch (error) {
      next(error)
    }
  }
}