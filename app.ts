import express, { type Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
const API_VERSION = "/api/v1";

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.get(`${API_VERSION}/`, (_req, res) => {
  res.send("initial commit");
});

export default app;
