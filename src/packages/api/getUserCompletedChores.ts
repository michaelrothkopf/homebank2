import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { getUserChoresCompleted } from "../db/completedChore";

export const route = {
    path: "/api/v2/getUserCompletedChores",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const validationResult = await tokenIsValid(req.cookies.loginKey);

        if (!validationResult.success || !validationResult.user) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }

        const data = await getUserChoresCompleted(validationResult.user.id);

        res.send({
            failed: false,
            data: data,
        });
    },
};