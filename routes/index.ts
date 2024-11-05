import { Express } from "express";
import { reindeerRoutes } from "./reindeer";
import ReindeerModel from "../models/reindeer";
import { weatherRoutes } from "./weather";

export const registerRoutes = (app: Express, apiVersion: string) => {
    
    app.use(`${apiVersion}/reindeers`, reindeerRoutes(ReindeerModel));
    app.use(`${apiVersion}/weather`, weatherRoutes());
}