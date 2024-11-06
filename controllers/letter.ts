import { type Request, type Response, type NextFunction } from 'express';
import { LetterModelStatic } from '../models/letter';

export class LetterController {
    private letterModel: LetterModelStatic
    constructor(letterModel: LetterModelStatic) {
        this.letterModel = letterModel
    }

    create = async ({query}: Request, res: Response, next: NextFunction) : Promise<void> => {
      try {
        await this.letterModel.create();
          res.status(200).json({ message:'created'});
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving letters' });
        next(error)
      }
    }

    getAll = async ({query}: Request, res: Response, next: NextFunction) : Promise<void> => {
        try {
          const limit = parseInt(query.limit as string) || 10;
          const offset = parseInt(query.offset as string) || 0;

          const letters = await this.letterModel.getAll({limit, offset});
          res.status(200).json({ letters: letters });
        } catch (error) {
          res.status(500).json({ error: 'Error retrieving letters' });
          next(error)
        }
    }
    getById = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const id = req.params['id'];
            if (!id) {
                return res.status(400).json({ error: 'Id parameter is required' });
            }

            const letter = await this.letterModel.getById(id);
            if (!letter) {
                return res.status(404).json({ error: 'Letter not found' });
            }

            res.status(200).json({ letter: letter });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving a letter' });
            next(error)
        }
    }

    updateStatus = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(404).json({ error: 'Id parameter is required' });
            }

            const updatedLetter = await this.letterModel.updateStatus(id);
            res.status(200).json({ letter: updatedLetter });
        } catch (error) {
            res.status(500).json({ error: 'Error updating a letter' });
            next(error)
        }
    }
}