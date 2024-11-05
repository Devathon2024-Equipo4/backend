import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3000";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "";

interface Config {
  PORT: string;
  WEATHER_API_KEY: string;
}

const config: Config = {
  PORT,
  WEATHER_API_KEY,
};

export default config;