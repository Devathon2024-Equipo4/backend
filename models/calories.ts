import { PrismaClient, Calories } from "@prisma/client"

export interface CaloriesDocument extends Calories {}
export type CreateCaloriesType = Pick<Calories, "cookiesName" | "quantity" |"calories">
export type UpdateCaloriesType = Partial<Calories>
export interface CaloriesModelStatic{
  getAll: () => Promise<CaloriesDocument[]>
  getByName: (name: string) => Promise<CaloriesDocument | null>
  create: (data: CreateCaloriesType) => Promise<CaloriesDocument>
  update: (id: string, data: UpdateCaloriesType) => Promise<CaloriesDocument>
  delete: (id: string) => Promise<CaloriesDocument>
  getById: (id: string) => Promise<CaloriesDocument | null>
}

const prisma = new PrismaClient()

export default class CaloriesModel {
  static getAll = async () => await prisma.calories.findMany()
  static getByName = async (name: string) => {
    return await prisma.calories.findUnique({
      where: {
        cookiesName: name
      }
    })
  }
  static create = async (data: CreateCaloriesType) =>
    await prisma.calories.create({ data })
  static update = async (id: string, data: UpdateCaloriesType) => {
    return await prisma.calories.update({
      data,
      where: { id }
    })
  }
  static delete = async (id: string) => await prisma.calories.delete({ where: { id } })
  static getById = async (id: string) => await prisma.calories.findUnique({ where: { id } })
}

