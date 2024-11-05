import { type Request, type Response, type NextFunction } from 'express';
import config from '../utils/config';

export class WeatherController {
    getWeather = async (req: Request, res: Response, next: NextFunction): Promise<any>  =>{
        try {
            const query = req.params['query'];
            if (!query) {
                return res.status(400).json({ error: 'Query parameter is required' });
            }
      
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${config.WEATHER_API_KEY}&q=${query}&aqi=no`;

            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                return res.status(response.status).json({ error: 'Error fetching weather data' });
            }

            const weatherData = await response.json();
            res.status(200).json(weatherData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving weather data' });
            next(error)
        }

    }

}