import Router from "express"
import { WeatherController } from "../controllers/weather"
import { type ReindeerModelStatic } from "../models/reindeer"

export const weatherRoutes = (reindeerModel: ReindeerModelStatic) => {
  const controller = new WeatherController( reindeerModel)
  const router = Router()

  router.get("/:query", controller.getWeather);
  return router
}
