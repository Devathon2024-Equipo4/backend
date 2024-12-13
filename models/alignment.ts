import { PrismaClient, Alignment } from "@prisma/client";

export interface AlignmentDocument extends Alignment {}
export type CreateAlignmentType = Pick<AlignmentDocument, "name">;
export type UpdateAlignmentType = Partial<AlignmentDocument>;
export interface AlignmentModelStatic {
  getAll: () => Promise<AlignmentDocument[]>;
  getById: (id: string) => Promise<AlignmentDocument | null>;
  create: (data: CreateAlignmentType) => Promise<AlignmentDocument>;
  update: (id: string, data: UpdateAlignmentType) => Promise<AlignmentDocument>;
  delete: (id: string) => Promise<AlignmentDocument>;
}

const prisma = new PrismaClient();

export default class AlignmentModel {
  static getAll = async () => await prisma.alignment.findMany();
  static getById = async (id: string) => {
    return await prisma.alignment.findUnique({
      where: {
        id: id
      }
    });
  };
  static create = async (data: CreateAlignmentType) =>
    await prisma.alignment.create({ data });

  
  static update = async (id: string, data: UpdateAlignmentType) => {
    return await prisma.alignment.update({
      data,
      where: { id }
    });
  };
  static delete = async (id: string) => {
    return await prisma.alignment.delete({
      where: {
        id: id
      }
    });
  };

}