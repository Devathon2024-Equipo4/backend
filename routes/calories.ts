import  Router  from 'express';
import { CaloriesController } from '../controllers/calories';
import { type CaloriesModelStatic } from '../models/calories';

export const caloriesRoutes = (caloriesModel: CaloriesModelStatic) => {
    const controller = new CaloriesController(caloriesModel);
    const router = Router();

    router.get("/total", controller.getTotalCalories); // Esta debe ser la primera
    router.get("/:name", controller.getByName); // Luego define la ruta con parámetro
    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    return router;
};