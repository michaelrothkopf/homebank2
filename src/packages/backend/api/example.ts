import express from "express";

export = {
    path: "/example",
    route: (req: express.Request, res: express.Response) => {
        res.send({
            parameters: req.query,
            status: "Success!",
        });
    },
};