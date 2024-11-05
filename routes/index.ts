import { Express } from "express";
import { reindeerRoutes } from "./reindeer";
import ReindeerModel from "../models/reindeer";

export const registerRoutes = (app: Express, apiVersion: string) => {
    
    app.use(`${apiVersion}/reindeers`, reindeerRoutes(ReindeerModel));
}