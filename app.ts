import express, { type Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { registerRoutes } from "./routes";
import swagger from "./swagger"

const app: Express = express();
swagger(app)
const API_VERSION = "/api/v1";

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

registerRoutes(app, API_VERSION);

export default app;
