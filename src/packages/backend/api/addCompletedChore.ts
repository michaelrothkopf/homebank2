import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { logCompletedChore } from "../db/completedChore";

export = {
    path: "/addCompletedChore",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const validationResult = await tokenIsValid(req.cookies.loginToken);

        if (!validationResult.success || !validationResult.user) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }

        const data = await logCompletedChore(validationResult.user.id, req.body.choreId);

        res.send({
            failed: false,
            data: data,
        });
    },
};