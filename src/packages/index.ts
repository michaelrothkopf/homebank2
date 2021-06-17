import { genRoutes } from "./loadApiRoutes"
import express from "express";
import { Application } from "./lib/expressTypes"

import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import chalk from "chalk";

console.log();

console.log(chalk.green("[homebank] Application started!"));

const app: Application = express();

const PORT = 5000;

try {
    app.use(bodyParser.json());
    app.use(cookieParser());

    console.log(chalk.green("[homebank] Successfully loaded Express middleware!"));
} catch {
    console.log(chalk.red("[homebank] Error loading express middleware!"));

    process.exit(1);
}

try {
    genRoutes(app);
    
    console.log(chalk.green("[homebank] Successfully loaded backend API routes!"));
} catch {
    console.log(chalk.red("[homebank] Error loading backend API routes."));
}

app.listen(PORT, () => {
    console.log(chalk.green(`[homebank] Startup successful! Listening on port ${PORT}.`));
});