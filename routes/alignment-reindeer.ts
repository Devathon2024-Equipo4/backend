import { Router } from "express"
import { AlignmentReindeerController } from "../controllers/alignment-reindeer"
import { type AlignmentReindeerModelStatic } from "../models/alignment-reindeer"

export const alignmentReindeerRoutes = (
  alignmentReindeerModel: AlignmentReindeerModelStatic
): Router => {
  const router = Router()

  const alignmentReindeerController = new AlignmentReindeerController(alignmentReindeerModel)

  router.get("/", alignmentReindeerController.getAllWithReindeer)
  router.get("/:alignmentId", alignmentReindeerController.getIdAlignmentReindeer)
  router.post("/", alignmentReindeerController.create)
  router.put("/", alignmentReindeerController.update)
  router.delete("/:alignmentId", alignmentReindeerController.delete)

  return router
}