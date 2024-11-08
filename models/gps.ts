import { PrismaClient, Address } from "@prisma/client"

export interface GpsDocument extends Address {}
export type CreateGpsType = Pick<Address, "address">
export type UpdateGpsType = Partial<Address>
export interface GpsModelStatic {
  getAll: () => Promise<GpsDocument[]>
  getRecent: () => Promise<GpsDocument[]>
  getByAddress: (address: string) => Promise<GpsDocument | null>
  create: (data: CreateGpsType) => Promise<GpsDocument>
  update: (id: string, data: UpdateGpsType) => Promise<GpsDocument>
  delete: (id: string) => Promise<GpsDocument | null>
}

const prisma = new PrismaClient()

export default class GpsModel {
  static getAll = async () => await prisma.address.findMany()
  static getRecent = async () => await prisma.address.findMany({ orderBy: { created_at: 'desc' },
    take: 5, })
  static getByAddress = async (address: string) => await prisma.address.findFirst({
    where: { 
        address: {
            equals: address.toLowerCase(), 
            mode: 'insensitive'
        }
    }
});
  static create = async (data: CreateGpsType) => 
    {
      try {
          
          const normalizedAddress = data.address.trim().toLowerCase();
          const createdAddress = await prisma.address.create({
              data: {
                  ...data,
                  address: normalizedAddress,
              },
          });

          return createdAddress;
      } catch (error) {
          console.error('Error creating address:', error);
          throw new Error('Failed to create address');
      }
  }
  static update = async (id: string, data: UpdateGpsType) => await prisma.address.update({ where: { id }, data })
  static delete = async (id: string) => await prisma.address.delete({ where: { id } })
}