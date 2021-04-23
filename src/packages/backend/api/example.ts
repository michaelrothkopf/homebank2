import { Request, Response } from "express";

export = {
    path: "/example",
    method: 'post',
    route: (req: Request, res: Response) => {
        res.send({
            parameters: req.query,
            status: "Success!",
        });
    },
};