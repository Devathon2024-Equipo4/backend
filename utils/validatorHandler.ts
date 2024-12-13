import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

type Property = 'body' | 'query' | 'params';

export const validatorHandler = (schema: Schema, property: Property) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const data = request[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const validationError = new Error('Validation error');
      (validationError as any).details = error.details; 
      next(validationError); 
    } else {
      next();
    }
  };
};
