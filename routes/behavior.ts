import  Router  from 'express';
import { BehaviorModelStatic } from '../models/child-behavior';
import { BehaviorController } from '../controllers/behavior';

export const behaviorRoutes = (behaviorModel: BehaviorModelStatic) => {
    const controller = new BehaviorController(behaviorModel);
    const router = Router();

    router.get("/", controller.getAll);

    return router;
};