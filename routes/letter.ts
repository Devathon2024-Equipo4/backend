import  Router  from 'express';
import { LetterModelStatic } from '../models/letter';
import { LetterController } from '../controllers/letter';

export const letterRoutes = (letterModel: LetterModelStatic) => {
    const controller = new LetterController(letterModel);
    const router = Router();

    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.delete('/readLetter/:id', controller.updateStatus)

    return router;
};