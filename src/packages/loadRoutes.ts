import { readdirSync } from "fs";
import { join as joinPaths } from "path";
import { Application, Request, Response } from "./lib/expressTypes";

export interface ApiRoute {
    path: string,
    disabled?: boolean,
    route: (req: Request, res: Response) => void,
}

export const genRoutes = (app: Application) => {
    const apiRouteDirFiles = readdirSync(joinPaths(__dirname, "routes"));

    const modules = Promise.all(apiRouteDirFiles.map(file => import(joinPaths(__dirname, "routes", file))));

    modules.then((apiRoutes: any[]) => {
        for (const _apiRoute of apiRoutes) {
            const apiRoute: ApiRoute = _apiRoute.route;

            if (apiRoute.disabled === true) {
                continue;
            }

            app.get(apiRoute.path, apiRoute.route);
        }
    })
}