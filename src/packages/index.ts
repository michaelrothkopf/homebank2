import { genApiRoutes } from "./loadApiRoutes"
import { genRoutes } from "./loadRoutes";

import express from "express";
import { Application } from "./lib/expressTypes"

import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import chalk from "chalk";
import path from "path";

console.log();

console.log(chalk.green("[homebank] Application started!"));

const app: Application = express();

const PORT = 3000;

try {
    app.use(bodyParser.json());
    app.use(cookieParser());

    console.log(chalk.green("[homebank] Successfully loaded Express middleware!"));
} catch (err: any) {
    console.log(chalk.red("[homebank] Error loading Express middleware!"));
    console.log("Error message:");
    console.log(err);

    process.exit(1);
}

try {
    app.use('/public', express.static(path.resolve("./dist/public")));

    console.log(chalk.green("[homebank] Successfully loaded Express static folder!"));
} catch (err: any) {
    console.log(chalk.red("[homebank] Error loading Express static folder!"));
    console.log("Error message:");
    console.log(err);

    process.exit(1);
}

try {
    genApiRoutes(app);
    
    console.log(chalk.green("[homebank] Successfully loaded backend API routes!"));
} catch (err: any) {
    console.log(chalk.red("[homebank] Error loading backend API routes."));
    console.log("Error message:");
    console.log(err);

    process.exit(1);
}

try {
    genRoutes(app);
    
    console.log(chalk.green("[homebank] Successfully loaded frontend routes!"));
} catch (err: any) {
    console.log(chalk.red("[homebank] Error loading frontend routes."));
    console.log("Error message:");
    console.log(err);

    process.exit(1);
}

app.listen(PORT, () => {
    console.log(chalk.green(`[homebank] Startup successful! Listening on port ${PORT}.`));
});