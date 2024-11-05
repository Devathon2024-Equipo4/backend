import { type Request, type Response, type NextFunction } from 'express';
import { type CreateCaloriesType, type UpdateCaloriesType, CaloriesModelStatic} from '../models/calories';

export class CaloriesController {
    private caloriesModel: CaloriesModelStatic
    constructor(caloriesModel: CaloriesModelStatic) {
        this.caloriesModel = caloriesModel
    }

    getAll = async (_req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const calories = await this.caloriesModel.getAll();
            res.status(200).json({ calories: calories });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving calories' });
            next(error)
        }
    }
    getByName = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const name = req.params['name'];
            if (!name) {
                return res.status(400).json({ error: 'Name parameter is required' });
            }

            const calories = await this.caloriesModel.getByName(name);
            if (!calories) {
                return res.status(404).json({ error: 'Calories not found' });
            }

            res.status(200).json({ calories: calories });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving calories' });
            next(error)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const calories = req.body;
            if (!calories) {
                return res.status(400).json({ error: 'Calories data is required' });
            }
            const data: CreateCaloriesType = {
                cookiesName: calories.name,
                quantity: calories.quantity,
                calories: calories.calories
            }

            const createdCalories = await this.caloriesModel.create(data);
            res.status(201).json({ calories: createdCalories });
        } catch (error) {
            res.status(500).json({ error: 'Error creating calories' });
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
        try {
            const id = req.params.id;
            const calories = req.body;

            if (!id) {
                return res.status(400).json({ error: 'Id parameter is required' });
            }

            if (!calories) {
                return res.status(400).json({ error: 'Calories data is required' });
            }
            const data: UpdateCaloriesType = {
              cookiesName: calories.name,
              quantity: calories.quantity,
              calories: calories.calories, 
            }


            const updatedCalories = await this.caloriesModel.update(id, data);
            res.status(200).json({ reindeer: updatedCalories });
        } catch (error) {
            res.status(500).json({ error: 'Error updating calories' });
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
      try {
          const id = req.params.id;

          if (!id) {
              return res.status(400).json({ error: 'Id parameter is required' });
          }

          const deleteCalories = await this.caloriesModel.delete(id);
          res.status(200).json({ calories: deleteCalories });
      } catch (error) {
          res.status(500).json({ error: 'Error deleting calories' });
          next(error)
      }
  }
}