import  Router  from 'express';
import { ChildBehaviorModelStatic } from '../models/child-behavior';
import { ChildBehaviorController } from '../controllers/child-behavior';

export const childBehaviorRoutes = (childBehaviorModel: ChildBehaviorModelStatic) => {
    const controller = new ChildBehaviorController(childBehaviorModel);
    const router = Router();

    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.put("/:childId/:behaviorId", controller.update);

    return router;
};