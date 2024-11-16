import { Router } from "express"
import { AlignmentController } from "../controllers/alignment"
import { type AlignmentModelStatic } from "../models/alignment"

export const alignmentRoutes = (
  alignmentModel: AlignmentModelStatic
): Router => {
  const router = Router()

  const alignmentController = new AlignmentController(alignmentModel)

  router.get("/", alignmentController.getAll)
  router.get("/:id", alignmentController.getById)
  router.post("/", alignmentController.create)
  router.put("/:id", alignmentController.update)
  router.delete("/:id", alignmentController.delete)

  return router
}