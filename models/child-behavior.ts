import { Children, ChildBehavior, Behavior , PrismaClient } from "@prisma/client"
import { Pagination } from "../types/pagination"

export interface BehaviorDocument extends Behavior {}
export interface ChildrenDocument extends Children {}
export interface ChildBehaviorDocument extends ChildBehavior {}

export type CreateChildBehaviorType = Pick<ChildBehavior, "behaviorId" | "childId" | "points">;
export type UpdateChildrenType = Partial<Children>;

export interface BehaviorModelStatic {
  getAll: () => Promise<BehaviorDocument[]>
}

export interface ChildrenModelStatic {
  getAll: (pagination?: Pagination) => Promise<ChildrenDocument[] | any>
  getById: (id: string) => Promise<ChildrenDocument | null | any>
  updateChild: (id: string, data:UpdateChildrenType) => Promise<ChildrenDocument | any>
  updateChildScore: (id: string) => Promise<ChildrenDocument>
}

export interface ChildBehaviorModelStatic {
  createChildBehavior: (data: CreateChildBehaviorType) => Promise<ChildBehaviorDocument>
  getAll: () => Promise<ChildBehaviorDocument[]>
  updateChildBehavior: (id: { childId: string; behaviorId: string }, data: CreateChildBehaviorType) => Promise<ChildBehaviorDocument>
  deleteChildBehavior: (id: { childId: string; behaviorId: string }) => Promise<ChildBehaviorDocument>
}

const prisma = new PrismaClient()

class BehaviorModel{
  static getAll = async () =>
    await prisma.behavior.findMany()
}

class ChildrenModel {
  static getAll = async ({ limit = 20, offset = 0 }: Pagination={}) =>
    await prisma.children.findMany({
      take: limit,
      skip: offset,
      select:{
        id:true,
        name:true,
        status:true,
        behaviors:true
      }
    })
  static getById = async (id: string) => {
    return await prisma.children.findUnique({
      where: {
        id:id
      },
      select:{
        id:true,
        name:true,
        status:true,
        behaviors:true
      }
    })
  }
  static updateChild = async (id: string, data:UpdateChildrenType) => {
    return await prisma.children.update({
      where: {
        id: id
      },
      data: {
        ...data
      }
    })
  }

  static updateChildScore = async (id: string) => {
    const childBehaviors = await prisma.childBehavior.findMany({
      where: { childId:id },
      select: { points: true }
    });

    if (childBehaviors.length === 0) {
      return await prisma.children.update({
        where: { id: id },
        data: { status: 'BAD' }
      });
    }

    const points = childBehaviors.reduce((sum, behavior) => sum + behavior.points, 0);

    const score = (points / childBehaviors.length);

    return await prisma.children.update({
      where: {
        id: id
      },
      data: {
        status: score >= 75 ? 'GOOD':'BAD'
      }
    })
  }
}

class ChildBehaviorModel {
  static getAll = async () =>
    await prisma.childBehavior.findMany()
  
  static createChildBehavior = async (data:CreateChildBehaviorType) => {
    return await prisma.childBehavior.create({
      data: {
        ...data
      }
    })
  }

  static updateChildBehavior = async (id: { childId: string; behaviorId: string }, data: CreateChildBehaviorType) => {
    return await prisma.childBehavior.update({
      where: {
        childId_behaviorId: {
          childId: id.childId,
          behaviorId: id.behaviorId
        }
      },
      data: {
        points: data.points
      }
    });
  };
  static deleteChildBehavior = async (id: { childId: string; behaviorId: string }) => {
    return await prisma.childBehavior.delete({
      where: {
        childId_behaviorId: {
          childId: id.childId,
          behaviorId: id.behaviorId
        }
      }
    });   
  }
}

export default { BehaviorModel, ChildrenModel, ChildBehaviorModel }