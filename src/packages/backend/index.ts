import { genRoutes } from "./loadApiRoutes"
import express from "express";
import { Application } from "./lib/expressTypes"

import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Application = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(cookieParser());

genRoutes(app);

app.listen(PORT);