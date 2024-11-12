import { type Request, type Response, type NextFunction } from "express"
import { BehaviorModelStatic } from "../models/child-behavior"

export class BehaviorController {
  private behaviorModel: BehaviorModelStatic
  constructor(behaviorModel: BehaviorModelStatic) {
    this.behaviorModel = behaviorModel
  }
  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const behaviors = await this.behaviorModel.getAll()
      res.status(200).json({ behaviors: behaviors })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving behaviors" })
      next(error)
    }
  }
}
