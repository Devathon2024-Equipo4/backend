import { type Request, type Response, type NextFunction } from "express"
import { ChildBehaviorDocument, ChildBehaviorModelStatic } from "../models/child-behavior"

export class ChildBehaviorController {
  private childBehaviorModel: ChildBehaviorModelStatic
  constructor(childBehaviorModel: ChildBehaviorModelStatic) {
    this.childBehaviorModel = childBehaviorModel
  }
  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const childBehaviors = await this.childBehaviorModel.getAll()
      res.status(200).json({ childBehaviors: childBehaviors })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving childBehaviors" })
      next(error)
    }
  }
  create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const childBehavior = req.body as ChildBehaviorDocument
      if (!childBehavior || !childBehavior.childId || !childBehavior.behaviorId || !childBehavior.points) {
        return res
          .status(400)
          .json({ error: "data (childId, behaviorId, points) is required" })
      }
      const createdChildBehavior = await this.childBehaviorModel.createChildBehavior(childBehavior)
      res.status(201).json({ childBehavior: createdChildBehavior })
    } catch (error) {
      res.status(500).json({ error: "Error creating childBehavior" })
      next(error)
    }
  }
}
