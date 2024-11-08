import { type Request, type Response, type NextFunction } from 'express';
import { type CreateGpsType, type UpdateGpsType, GpsModelStatic } from '../models/gps';

export class GpsController {
    private gpsModel: GpsModelStatic
    constructor(gpsModel: GpsModelStatic) {
        this.gpsModel = gpsModel
    }
    getAll = async (_req: Request, res: Response, next: NextFunction): Promise<any>  =>{
        try {
            const gps = await this.gpsModel.getAll();
            res.status(200).json({ address: gps});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving address data' });
            next(error)
        }
    }
    recent = async (_req: Request, res: Response, next: NextFunction): Promise<any>  =>{
        try {
            const recentAddress = await this.gpsModel.getRecent();
            res.status(200).json({ address: recentAddress});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving address data' });
            next(error)
        }
    }
    create = async (req: Request, res: Response, next: NextFunction): Promise<any>  =>{
        try {
            const { address } = req.body;
            if (!address) {
                return res.status(400).json({ error: 'Address is required' });
            }
            const addressCreated = await this.gpsModel.create({ address });
            res.status(201).json({ address: addressCreated});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating address' });
            next(error)
        }
    }
    update = async (req: Request, res: Response, next: NextFunction): Promise<any>  =>{
        try {
            const { id } = req.params;
            const { address } = req.body;
            if (!id || !address) {
                return res.status(400).json({ error: 'ID and Address are required' });
            }
            const addressUpdated = await this.gpsModel.update(id, { address });
            res.status(200).json({ address: addressUpdated});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating address' });
            next(error)
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<any>  =>{
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID is required' });
            }
            const addressDeleted = await this.gpsModel.delete(id);
            res.status(200).json({ address: addressDeleted});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting address' });
            next(error)
        }
    }
}   