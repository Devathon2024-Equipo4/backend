import { PrismaClient, Address } from "@prisma/client"

export interface GpsDocument extends Address {}
export type CreateGpsType = Pick<Address, "address">
export type UpdateGpsType = Partial<Address>
export interface GpsModelStatic {
  getAll: () => Promise<GpsDocument[]>
  getRecent: () => Promise<GpsDocument[]>
  create: (data: CreateGpsType) => Promise<GpsDocument>
  update: (id: string, data: UpdateGpsType) => Promise<GpsDocument>
  delete: (id: string) => Promise<GpsDocument | null>
}

const prisma = new PrismaClient()

export default class GpsModel {
  static getAll = async () => await prisma.address.findMany()
  static getRecent = async () => await prisma.address.findMany({ orderBy: { created_at: 'desc' },
    take: 5, })
  static create = async (data: CreateGpsType) => await prisma.address.create({ data })
  static update = async (id: string, data: UpdateGpsType) => await prisma.address.update({ where: { id }, data })
  static delete = async (id: string) => await prisma.address.delete({ where: { id } })
}