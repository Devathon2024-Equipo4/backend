import { PrismaClient, Elf, Status } from "@prisma/client";

export interface ElfDocument extends Elf {}
export type CreateElfType = Pick<Elf, "name" | "age" | "gender"| "status">;
export type UpdateElfType = Partial<Elf>;
export interface ElfModelStatic {
  getAll: () => Promise<ElfDocument[]>;
  getByStatus: (status: Status) => Promise<ElfDocument[]>;
  create: (data: CreateElfType) => Promise<ElfDocument>;
  update: (id: string, data: UpdateElfType) => Promise<ElfDocument>;
}

const prisma = new PrismaClient();

export default class ElfModel {
  static getAll = async () => await prisma.elf.findMany();
  
  static getByStatus = async (status: Status) => {
    return await prisma.elf.findMany({
      where: {
        status: status,
      },
    });
  };

  static create = async (data: CreateElfType) =>
    await prisma.elf.create({ data });

  static update = async (id: string, data: UpdateElfType) => {
    return await prisma.elf.update({
      data,
      where: { id },
    });
  };
}
