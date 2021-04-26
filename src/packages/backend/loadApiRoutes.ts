import { readdirSync } from "fs";
import { join as joinPaths } from "path";
import { Application, Request, Response } from "express";

export interface ApiRoute {
    path: string,
    method?: string,
    disabled?: boolean,
    route: (req: Request, res: Response) => void,
}

export const genRoutes = (app: Application) => {
    const apiRouteDirFiles = readdirSync(joinPaths(__dirname, "api"));

    const modules = Promise.all(apiRouteDirFiles.map(file => import(joinPaths(__dirname, "api", file))));

    modules.then((apiRoutes: ApiRoute[]) => {
        for (const apiRoute of apiRoutes) {
            if (apiRoute.disabled === true) {
                continue;
            }

            switch (apiRoute.method) {
                case "get":
                    app.get(apiRoute.path, apiRoute.route);
                    break;
                case "head":
                    app.head(apiRoute.path, apiRoute.route);
                    break;
                case "put":
                    app.put(apiRoute.path, apiRoute.route);
                    break;
                case "delete":
                    app.delete(apiRoute.path, apiRoute.route);
                    break;
                case "connect":
                    app.connect(apiRoute.path, apiRoute.route);
                    break;
                case "options":
                    app.options(apiRoute.path, apiRoute.route);
                    break;
                case "trace":
                    app.trace(apiRoute.path, apiRoute.route);
                    break;
                case "patch":
                    app.patch(apiRoute.path, apiRoute.route);
                    break;
                default:
                    app.post(apiRoute.path, apiRoute.route);
            }
        }
    })
}