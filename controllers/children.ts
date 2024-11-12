import { type Request, type Response, type NextFunction } from "express"
import { ChildrenDocument, ChildrenModelStatic } from "../models/child-behavior"

export class ChildrenController {
  private childrenModel: ChildrenModelStatic
  constructor(childrenModel: ChildrenModelStatic) {
    this.childrenModel = childrenModel
  }
  getAll = async ({ query }: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = parseInt(query.limit as string) || 20
      const offset = parseInt(query.offset as string) || 0

      const children = await this.childrenModel.getAll({ limit, offset })
      res.status(200).json({ children: children })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving children" })
      next(error)
    }
  }
  getById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const id = req.params["id"]
      if (!id) {
        return res.status(400).json({ error: "Id parameter is required" })
      }

      const child = await this.childrenModel.getById(id)
      if (!child) {
        return res.status(404).json({ error: "child not found" })
      }

      res.status(200).json({ child: child })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving a child" })
      next(error)
    }
  }

  updateChild = async ( req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const id = req.params.id
      const childData = req.body as ChildrenDocument

      if (!id) {
        return res.status(404).json({ error: "Id parameter is required" })
      }

      if (!childData) {
        return res.status(400).json({ error: "child data is required" })
      }

      const updatedChild = await this.childrenModel.updateChild(id, childData)
      res.status(200).json({ child: updatedChild })
    } catch (error) {
      res.status(500).json({ error: "Error updating a child" })
      next(error)
    }
  }

  updateChildScore = async ( req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const id = req.params.id

      if (!id) {
        return res.status(404).json({ error: "Id parameter is required" })
      }

      const updatedChildScore = await this.childrenModel.updateChildScore(id)
      res.status(200).json({ child: updatedChildScore })
    } catch (error) {
      res.status(500).json({ error: "Error updating a child score" })
      next(error)
    }
  }
}
