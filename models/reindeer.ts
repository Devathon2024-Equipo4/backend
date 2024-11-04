import { PrismaClient, Reindeer } from "@prisma/client"

export interface ReindeerDocument extends Reindeer {}
export type CreateReindeerType = Pick<Reindeer, "name" | "alignment">
export type UpdateReindeerType = Partial<Reindeer>

export interface ReindeerModelInterface {
  getAll: () => Promise<ReindeerDocument[]>
  getByName: (name: string) => Promise<ReindeerDocument | null>
  create: (data: CreateReindeerType) => Promise<ReindeerDocument>
  update: (id: string, data: UpdateReindeerType) => Promise<ReindeerDocument>
}

const prisma = new PrismaClient()

export default class ReindeerModel {
  static getAll = async () => await prisma.reindeer.findMany()
  static getByName = async (name: string) => {
    return await prisma.reindeer.findUnique({
      where: {
        name: name
      }
    })
  }
  static create = async (data: CreateReindeerType) =>
    await prisma.reindeer.create({ data })
  static update = async (id: string, data: UpdateReindeerType) => {
    return await prisma.reindeer.update({
      data,
      where: { id }
    })
  }
}
