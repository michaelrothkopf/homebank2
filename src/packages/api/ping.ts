import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { logCompletedChore } from "../db/completedChore";

export = {
    path: "/ping",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        res.send("Ping successful!");
    },
};