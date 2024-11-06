import { Letter, PrismaClient } from "@prisma/client"
import { Pagination } from "../types/pagination"

export interface LetterDocument extends Letter {}

export interface LetterModelStatic {
  create : ()=> Promise<any>
  getAll: (pagination?: Pagination) => Promise<LetterDocument[]>
  getById: (id: string) => Promise<LetterDocument | null>
  updateStatus: (id: string) => Promise<LetterDocument>
}

const prisma = new PrismaClient()

export default class LetterModel {
  static getAll = async ({ limit = 10, offset = 0 }: Pagination={}) =>
    await prisma.letter.findMany({
      take: limit,
      skip: offset
    })
  static getById = async (id: string) => {
    return await prisma.letter.findUnique({
      where: {
        id:id
      }
    })
  }
  static updateStatus = async (id: string) => {
    return await prisma.letter.update({
      where: {
        id: id
      },
      data: {
        status: true
      }
    })
  }
}
