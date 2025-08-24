import {Request, Response, NextFunction} from "express"
import {prisma} from "@/database/prisma"
import { AppError } from "@/utils/app-error"
import {z} from "zod"

export class UserActivitiesController{
  async create(request:Request, response:Response, next:NextFunction){
    try {
      return response.json("ok")
    } catch (error) {
      next(error)
    }
  }
}