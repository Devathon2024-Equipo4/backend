import  Router  from 'express';
import { ChildrenModelStatic } from '../models/child-behavior';
import { ChildrenController } from '../controllers/children';

export const childrenRoutes = (childrenModel: ChildrenModelStatic) => {
    const controller = new ChildrenController(childrenModel);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.patch("/:id", controller.updateChild);
    router.patch('/checkStatus/:id', controller.updateChildScore);
    router.post("/", controller.create);
    router.delete("/:id", controller.delete)

    return router;
};