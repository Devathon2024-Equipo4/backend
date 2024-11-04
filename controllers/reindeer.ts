import { Request, Response } from 'express';
import { type CreateReindeerType, type UpdateReindeerType, ReindeerModelInterface} from '../models/reindeer';

export class ReindeerController {
    private reindeerModel: ReindeerModelInterface
    constructor(productModel: ReindeerModelInterface) {
        this.reindeerModel = productModel
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const reindeers = await this.reindeerModel.getAll();
            res.status(200).json({ reindeers });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving reindeers' });
        }
    }
    getByName = async (req: Request, res: Response) => {
        try {
            const name = req.params['name'];
            if (!name) {
                return res.status(400).json({ error: 'Name parameter is required' });
            }
    
            const reindeer = await this.reindeerModel.getByName(name);
            if (!reindeer) {
                return res.status(404).json({ error: 'Reindeer not found' });
            }
    
            res.status(200).json({ reindeer });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving reindeer' });
        }
    }
    create = async (req: Request, res: Response) => {
        try {
            const reindeer = req.body;
            if (!reindeer) {
                return res.status(400).json({ error: 'Reindeer data is required' });
            }
            const createdReindeer = await this.reindeerModel.create(reindeer);
            res.status(201).json({ reindeer: createdReindeer });
        } catch (error) {
            res.status(500).json({ error: 'Error creating reindeer' });
        }
    }
  
    update = async (req: Request, res: Response) => {
        try {
            const reindeer = req.body;
            if (!reindeer) {
                return res.status(400).json({ error: 'Reindeer data is required' });
            }
            const updatedReindeer = await this.reindeerModel.update(reindeer);
            res.status(200).json({ reindeer: updatedReindeer });
        } catch (error) {
            res.status(500).json({ error: 'Error updating reindeer' });
        }
    }
}