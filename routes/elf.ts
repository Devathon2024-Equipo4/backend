import { Router } from 'express';
import { ElfController } from '../controllers/elf';
import { type ElfModelStatic } from '../models/elf';

export const elfRoutes = (elfModel: ElfModelStatic) => {
  const controller = new ElfController(elfModel);
  const router = Router();

  router.get("/", controller.getAll);
  router.get("/status/:status", controller.getByStatus);
  router.post("/", controller.create);
  router.put("/:id", controller.update);

  return router;
};