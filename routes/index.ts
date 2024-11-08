import { Express } from "express";
import { reindeerRoutes } from "./reindeer";
import ReindeerModel from "../models/reindeer";
import { caloriesRoutes } from "./calories";
import CaloriesModel from "../models/calories";
import { elfRoutes } from "./elf";
import ElfModel from "../models/elf";
import { weatherRoutes } from "./weather";
import { letterRoutes } from "./letter";
import LetterModel from "../models/letter";
import { gpsRoutes } from "./gps";
import GpsModel from "../models/gps";

export const registerRoutes = (app: Express, apiVersion: string) => {
    
    app.use(`${apiVersion}/reindeers`, reindeerRoutes(ReindeerModel));
    app.use(`${apiVersion}/calories`, caloriesRoutes(CaloriesModel));
    app.use(`${apiVersion}/elves`, elfRoutes(ElfModel));
    app.use(`${apiVersion}/weather`, weatherRoutes(ReindeerModel));
    app.use(`${apiVersion}/letter`, letterRoutes(LetterModel));
    app.use(`${apiVersion}/gps`, gpsRoutes(GpsModel));
}