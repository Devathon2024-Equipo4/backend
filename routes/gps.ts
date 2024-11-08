import Router  from 'express';
import { GpsController } from '../controllers/gps';
import { type GpsModelStatic } from '../models/gps';

export const gpsRoutes = (gpsModel: GpsModelStatic) => {
    const gpsController = new GpsController(gpsModel);
    const router = Router();
    router.get('/', gpsController.getAll);
    router.get('/recent', gpsController.recent);
    router.post('/', gpsController.create);
    router.put('/:id', gpsController.update);
    router.delete('/:id', gpsController.delete);
    return router;
}