import {type Request, type Response, type NextFunction} from 'express';
import { type CreateAlignmentReindeerType, type UpdateAlignmentReindeerType } from '../models/alignment-reindeer';
import { AlignmentReindeerModelStatic } from '../models/alignment-reindeer';

interface  AlignmenteReindeerRequest extends Request {
    body: CreateAlignmentReindeerType;
}

export class AlignmentReindeerController {
  private alignmentReindeerModel: AlignmentReindeerModelStatic;
  constructor(alignmentReindeerModel: AlignmentReindeerModelStatic) {
    this.alignmentReindeerModel = alignmentReindeerModel;
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const relations: CreateAlignmentReindeerType[] = req.body;

      if (!Array.isArray(relations) || relations.length === 0) {
         res.status(400).json({ error: "Invalid input: body must be a non-empty array" });
         return
      }

      const results = await Promise.all(
        relations.map(async (relation) => {
          const { alignmentId, reindeerId, order } = relation;

         
          if (!alignmentId || !reindeerId) {
            throw new Error("Missing alignmentId or reindeerId in relation");
          }

          const newRelation: CreateAlignmentReindeerType = {
            alignmentId,
            reindeerId,
            order
          };

          return await this.alignmentReindeerModel.create(newRelation);
        })
      );

      res.status(201).json({
        message: "Relation AlignmentReindeer created successfully",
        relations: results 
      });
    } catch (error) {
      res.status(500).json({ error: "Error creating a relation" });
      next(error); 
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const relations: UpdateAlignmentReindeerType[] = req.body["alignment-reindeer"];

      if (!Array.isArray(relations) || relations.length === 0) {
         res.status(400).json({ error: "Invalid input: alignment-reindeer must be a non-empty array" });
         return
      }
      
      const updatePromises = relations.map(async (relation) => {
      
        const { alignmentId, reindeerId, order } = relation;

        if (!alignmentId || !reindeerId) {
          throw new Error("Missing alignmentId or reindeerId in relation");
        }

        return await this.alignmentReindeerModel.update(
          { alignmentId, reindeerId },
          { alignmentId, reindeerId, order } 
        );
      });

      await Promise.all(updatePromises);

      res.status(200).json({ message: "Relation AlignmentReindeer updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error updating a relation" });
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { alignmentId, reindeerId } = req.params;
      if (!alignmentId || !reindeerId) {
        res.status(400).json({ error: "Both alignmentId and reindeerId parameters are required" });
        return
      }
      const id = { alignmentId, reindeerId };
      const deletedRecord = await this.alignmentReindeerModel.delete(id);

      if (!deletedRecord) {
        res.status(404).json({ error: "Relation not found" });
        return
      }
      res.status(200).json({ message: "Relation AlignmentReindeer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting a relation" });
      next(error);
    }
  };

  getAllWithReindeer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const relation = await this.alignmentReindeerModel.getAllWithReindeer();
      res.status(200).json({ relation: relation });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving relations" });
      next(error);
    }
  };
}

