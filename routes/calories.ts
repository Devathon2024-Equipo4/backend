import  Router  from 'express';
import { CaloriesController } from '../controllers/calories';
import { type CaloriesModelStatic } from '../models/calories';

export const caloriesRoutes = (caloriesModel: CaloriesModelStatic) => {
    const controller = new CaloriesController(caloriesModel);
    const router = Router();

    router.get("/total", controller.getTotalCalories); 
    router.get("/reset", controller.reset)
    router.get("/:name", controller.getByName); 
    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
};