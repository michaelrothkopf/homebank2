import { Request, Response } from "express";

export const route = {
    path: "/api/v2/example",
    method: 'post',
    disabled: true,
    route: (req: Request, res: Response) => {
        res.send({
            parameters: req.query,
            status: "Success!",
        });
    },
};