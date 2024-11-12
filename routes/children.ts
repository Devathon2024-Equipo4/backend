import  Router  from 'express';
import { ChildrenModelStatic } from '../models/child-behavior';
import { ChildrenController } from '../controllers/children';

export const childrenRoutes = (childrenModel: ChildrenModelStatic) => {
    const controller = new ChildrenController(childrenModel);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.patch("/:id", controller.updateChild);
    router.delete('/checkStatus/:id', controller.updateChildScore)

    return router;
};