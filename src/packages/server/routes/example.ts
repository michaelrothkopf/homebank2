import { Request, Response } from "express";

export const route = {
    path: "/example",
    disabled: true,
    route: (req: Request, res: Response) => {
        res.send({
            parameters: req.query,
            status: "Success!",
        });
    },
};