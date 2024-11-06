import { Express } from "express";
import { reindeerRoutes } from "./reindeer";
import ReindeerModel from "../models/reindeer";
import { caloriesRoutes } from "./calories";
import CaloriesModel from "../models/calories";
import { elfRoutes } from "./elf";
import ElfModel from "../models/elf";



export const registerRoutes = (app: Express, apiVersion: string) => {
    
    app.use(`${apiVersion}/reindeers`, reindeerRoutes(ReindeerModel));
    app.use(`${apiVersion}/calories`, caloriesRoutes(CaloriesModel));
    app.use(`${apiVersion}/elves`, elfRoutes(ElfModel));
}