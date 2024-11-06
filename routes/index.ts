import { Express } from "express";
import { reindeerRoutes } from "./reindeer";
import ReindeerModel from "../models/reindeer";
import { caloriesRoutes } from "./calories";
import CaloriesModel from "../models/calories";
import { weatherRoutes } from "./weather";
import { letterRoutes } from "./letter";
import LetterModel from "../models/letter";

export const registerRoutes = (app: Express, apiVersion: string) => {
    
    app.use(`${apiVersion}/reindeers`, reindeerRoutes(ReindeerModel));
    app.use(`${apiVersion}/calories`, caloriesRoutes(CaloriesModel));
    app.use(`${apiVersion}/weather`, weatherRoutes(ReindeerModel));
    app.use(`${apiVersion}/letter`, letterRoutes(LetterModel));
}