import { type Request, type Response, type NextFunction } from "express"
import {
  type CreateCaloriesType,
  type UpdateCaloriesType,
  CaloriesModelStatic
} from "../models/calories"

export class CaloriesController {
  private caloriesModel: CaloriesModelStatic
  constructor(caloriesModel: CaloriesModelStatic) {
    this.caloriesModel = caloriesModel
  }

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const calories = await this.caloriesModel.getAll()
      res.status(200).json({ calories: calories })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving calories" })
      next(error)
    }
  }
  getByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const name = req.params["name"]
      if (!name) {
        return res.status(400).json({ error: "Name parameter is required" })
      }

      const calories = await this.caloriesModel.getByName(name)
      if (!calories) {
        return res.status(404).json({ error: "Calories not found" })
      }

      res.status(200).json({ calories: calories })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving calories" })
      next(error)
    }
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const calories = req.body
      if (!calories) {
        return res.status(400).json({ error: "Calories data is required" })
      }
      const data: CreateCaloriesType = {
        cookiesName: calories.name,
        quantity: calories.quantity,
        calories: calories.calories
      }

      const createdCalories = await this.caloriesModel.create(data)
      res.status(201).json({ calories: createdCalories })
    } catch (error) {
      res.status(500).json({ error: "Error creating calories" })
      next(error)
    }
  }

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const id = req.params.id
      const calories = req.body

      if (!id) {
        return res.status(400).json({ error: "Id parameter is required" })
      }

      if (!calories) {
        return res.status(400).json({ error: "Calories data is required" })
      }

      const existingOnce = await this.caloriesModel.getById(id)
      if (!existingOnce) {
        return res.status(404).json({ error: "Calories entry not found" })
      }

      const data: UpdateCaloriesType = {
        cookiesName: calories.name,
        quantity: existingOnce.quantity + (calories.quantity || 0),
        calories: existingOnce.calories
      }

      const updatedCalories = await this.caloriesModel.update(id, data)
      res.status(200).json({ reindeer: updatedCalories })
    } catch (error) {
      res.status(500).json({ error: "Error updating calories" })
      next(error)
    }
  }

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const id = req.params.id

      if (!id) {
        return res.status(400).json({ error: "Id parameter is required" })
      }

      const deleteCalories = await this.caloriesModel.delete(id)
      res.status(200).json({ calories: deleteCalories })
    } catch (error) {
      res.status(500).json({ error: "Error deleting calories" })
      next(error)
    }
  }

  getTotalCalories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const calories = await this.caloriesModel.getAll()

      if (!Array.isArray(calories)) {
        return res.status(404).json({ error: "Not found" })
      }
      const {totalCalories, totalQuantity}  = calories.reduce((total, item) => {
        if (item.quantity && item.calories) {
           total.totalCalories  += item.quantity * item.calories
           total.totalQuantity  += item.quantity 
        }
        return total
      }, { totalCalories: 0, totalQuantity: 0 })
      res.status(200).json({ totalCalories: totalCalories, totalQuantity: totalQuantity })
    } catch (error) {
      res.status(500).json({ error: "Error retrieving calories" })
      next(error)
    }
  }
  reset = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try{
      const calories = await this.caloriesModel.getAll();
      if (!Array.isArray(calories)) {
        return res.status(404).json({ error: "No cookies found" });
      }
      const updatedCookies = await Promise.all(
        calories.map(async (item) => {
          await this.caloriesModel.update(item.id, { quantity: 0 });
          return { ...item, quantity: 0 }; 
        })
      );

      res.status(200).json({
        message: "All cookie quantities reset to 0",
        cookies: updatedCookies 
      });
    }catch (error) {
      res.status(500).json({ error: "Error resetting calories" })
      next(error)
    }
  }
}
