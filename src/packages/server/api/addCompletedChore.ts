import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { logCompletedChore } from "../db/completedChore";
import { RecordType } from "../db/record";

export const route = {
    path: "/api/v2/addCompletedChore",
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
        
        if (!(await userCanAccessRecord(validationResult.user.id, req.body.choreId, RecordType.Chore))) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }

        const data = await logCompletedChore(validationResult.user.id, req.body.choreId, validationResult.user.household);

        res.send({
            failed: false,
            data: data,
        });
    },
};