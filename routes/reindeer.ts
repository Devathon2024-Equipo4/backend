import  Router  from 'express';
import { ReindeerController } from '../controllers/reindeer';
import { type ReindeerModelInterface } from '../models/reindeer';

export const reindeerRoutes = (reindeerModel: ReindeerModelInterface) => {
    const controller = new ReindeerController(reindeerModel);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:name", controller.getAll);
    router.post("/", controller.create);
    router.put("/:name", controller.update);

    return router;
};