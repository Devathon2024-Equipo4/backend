import { type Request, type Response, type NextFunction } from 'express';
import { type CreateReindeerType, type UpdateReindeerType, ReindeerModelStatic} from '../models/reindeer';

export class ReindeerController {
    private reindeerModel: ReindeerModelStatic
    constructor(reindeerModel: ReindeerModelStatic) {
        this.reindeerModel = reindeerModel
    }

    getAll = async (_req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const reindeers = await this.reindeerModel.getAll();
            res.status(200).json({ reindeers: reindeers });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving reindeers' });
            next(error)
        }
    }
    getByName = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const name = req.params['name'];
            if (!name) {
                return res.status(400).json({ error: 'Name parameter is required' });
            }

            const reindeer = await this.reindeerModel.getByName(name);
            if (!reindeer) {
                return res.status(404).json({ error: 'Reindeer not found' });
            }

            res.status(200).json({ reindeer: reindeer });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving reindeer' });
            next(error)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const reindeer = req.body;
            if (!reindeer) {
                return res.status(400).json({ error: 'Reindeer data is required' });
            }
            const data: CreateReindeerType = {
                name: reindeer.name,
                alignment: reindeer.alignment
            }

            const createdReindeer = await this.reindeerModel.create(data);
            res.status(201).json({ reindeer: createdReindeer });
        } catch (error) {
            res.status(500).json({ error: 'Error creating reindeer' });
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const id = req.params.id;
            const reindeerData = req.body;

            if (!id) {
                return res.status(404).json({ error: 'Id parameter is required' });
            }

            if (!reindeerData) {
                return res.status(400).json({ error: 'Reindeer data is required' });
            }
            const data: UpdateReindeerType = {
                name: reindeerData.name,
                alignment: reindeerData.alignment
            }


            const updatedReindeer = await this.reindeerModel.update(id, data);
            res.status(200).json({ reindeer: updatedReindeer });
        } catch (error) {
            res.status(500).json({ error: 'Error updating reindeer' });
            next(error)
        }
    }
}

export const getReindeerAlignment = (temperature: number ,cloud : number, reindeers: any[]) =>{
    let final_alignment: { name: string; alignment: number }[] = [];
    //traditional alignment
    if (temperature < 0 || cloud > 75) {
        final_alignment = reindeers.map((r, index) => ({ name: r.name, alignment: index }));
    } else {
        const activeReindeers = ["Dasher", "Dancer"];
        const otherReindeers = reindeers.filter(r => !activeReindeers.includes(r.name));
        
        final_alignment = [
            ...activeReindeers.map((name, index) => ({ name, alignment: index })),
            ...otherReindeers.map((r, index) => ({ name: r.name, alignment: index + activeReindeers.length }))
        ];
    }

    return final_alignment;
}