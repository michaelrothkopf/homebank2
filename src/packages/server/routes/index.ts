import { Request, Response } from "express";
import path from "path";

export const route = {
    path: "/child/dashboard",
    disabled: false,
    route: (req: Request, res: Response) => {
        res.sendFile(path.resolve("./dist/html/childDashboard.html"));
    },
};