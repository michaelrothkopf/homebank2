import { Request, Response } from "express";

export = {
    path: "/example",
    method: 'post',
    disabled: true,
    route: (req: Request, res: Response) => {
        res.send({
            parameters: req.query,
            status: "Success!",
        });
    },
};