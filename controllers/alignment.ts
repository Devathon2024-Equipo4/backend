import { type Request, type Response, type NextFunction } from 'express';
import { type CreateAlignmentType, type UpdateAlignmentType, AlignmentModelStatic } from '../models/alignment';

export class AlignmentController {
    private alignmentModel: AlignmentModelStatic
    constructor(alignmentModel: AlignmentModelStatic) {
        this.alignmentModel = alignmentModel
    }

    getAll = async (_req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const alignments = await this.alignmentModel.getAll();
            res.status(200).json({ alignments: alignments });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving alignments' });
            next(error)
        }
    }
    getById = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const id = req.params['id'];
            if (!id) {
                return res.status(400).json({ error: 'Id parameter is required' });
            }

            const alignment = await this.alignmentModel.getById(id);
            if (!alignment) {
                return res.status(404).json({ error: 'Alignment not found' });
            }

            res.status(200).json({ alignment: alignment });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving alignment' });
            next(error)
        }
    }
    create = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const alignment = req.body;
            if (!alignment) {
                return res.status(400).json({ error: 'Alignment data is required' });
            }
            const data: CreateAlignmentType = {
                name: alignment.name
            }

            const createdAlignment = await this.alignmentModel.create(data);
            res.status(201).json({ alignment: createdAlignment });
        } catch (error) {
            res.status(500).json({ error: 'Error creating alignment' });
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const id = req.params.id;
            const alignmentData = req.body;

            if (!id) {
                return res.status(404).json({ error: 'Id parameter is required' });
            }

            if (!alignmentData) {
                return res.status(400).json({ error: 'Alignment data is required' });
            }
            const data: UpdateAlignmentType = {
                name: alignmentData.name
            }


            const updatedAlignment = await this.alignmentModel.update(id, data);
            res.status(200).json({ alignment: updatedAlignment });
        } catch (error) {
            res.status(500).json({ error: 'Error updating alignment' });
            next(error)
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({ error: 'Id parameter is required' });
            }

            await this.alignmentModel.delete(id);
            res.status(200).json({ message: 'Alignment deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting alignment' });
            next(error)
        }
    }
}