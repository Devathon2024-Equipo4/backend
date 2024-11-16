import { PrismaClient, AlignmentReindeer } from "@prisma/client"

export interface AlignmentReindeerDocument extends AlignmentReindeer {}
export type CreateAlignmentReindeerType = Pick<
  AlignmentReindeerDocument,
  "alignmentId" | "reindeerId" | "order"
>

export interface AlignmentReindeerModelStatic {
  getCompoundKey: (id: {
    reindeerId: string
    alignmentId: string
  }) => { alignmentId_reindeerId: { alignmentId: string; reindeerId: string } }
  create: (
    data: CreateAlignmentReindeerType
  ) => Promise<AlignmentReindeerDocument>
  update: (
    id: { alignmentId: string; reindeerId: string },
    data: CreateAlignmentReindeerType
  ) => Promise<AlignmentReindeerDocument>
  delete: (id: { alignmentId: string; reindeerId: string }) => Promise<AlignmentReindeerDocument>
  getAllWithReindeer: () => Promise<AlignmentReindeerDocument[]>
  getIdAlignmentReindeer: (alignmentId: string) => Promise<AlignmentReindeerDocument[]>
}


const prisma = new PrismaClient()

export default class AlignmentReindeerModel {
  static getCompoundKey(id: { alignmentId: string; reindeerId: string }) {
    return {
      alignmentId_reindeerId: {
        alignmentId: id.alignmentId,
        reindeerId: id.reindeerId,
      }
    };
  }

  static create = async (data: CreateAlignmentReindeerType) =>
    await prisma.alignmentReindeer.create({ data })

  static update = async (
    id: { alignmentId: string; reindeerId: string },
    data: CreateAlignmentReindeerType
  ) => {
    const compoundKey = AlignmentReindeerModel.getCompoundKey(id)
    const result = await prisma.alignmentReindeer.upsert({
      where: compoundKey,
      update: {
        order: data.order
      },
      create: {
        alignmentId: data.alignmentId,
        reindeerId: data.reindeerId,
        order: data.order
      }
    })
    return result
  }

  static delete = async (id: { alignmentId: string; reindeerId: string }) => {
    const compoundKey = AlignmentReindeerModel.getCompoundKey(id);
    return await prisma.alignmentReindeer.delete({
      where: {
        alignmentId_reindeerId: compoundKey.alignmentId_reindeerId,
      },
    });
  };

  static getAllWithReindeer = async () => {
    const results = await prisma.alignmentReindeer.findMany({
      include: {
        reindeer: true
      },
    });

    return results.map(result => ({
      alignmentId: result.alignmentId,
      reindeerId: result.reindeerId,
      order: result.order,
      id: result.id,
    }));
  };

  static getIdAlignmentReindeer = async (alignmentId: string) => {
    const results = await prisma.alignmentReindeer.findMany({ 
      where: {
        alignmentId: alignmentId
      },
      include: {
        reindeer: true
      }
    });
    return results
  }

}
