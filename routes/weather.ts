import Router from "express"
import { WeatherController } from "../controllers/weather"

export const weatherRoutes = () => {
  const controller = new WeatherController()
  const router = Router()

  router.get("/:query", controller.getWeather);
  return router
}
