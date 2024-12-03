import { Router } from 'express';
import { ElfController } from '../controllers/elf';
import { type ElfModelStatic } from '../models/elf';
import { validatorHandler } from '../utils/validatorHandler';
import elfSchema from '../schemas/elf-schema';

export const elfRoutes = (elfModel: ElfModelStatic) => {
  const controller = new ElfController(elfModel);
  const router = Router();

  router.get("/", controller.getAll);
  router.get("/status/:status", controller.getByStatus);
  router.get("/:name", controller.getByName);
  router.post("/", validatorHandler(elfSchema.create, "body"), controller.create);
  router.put("/:id",validatorHandler(elfSchema.get, "params"), controller.update);

  return router;
};