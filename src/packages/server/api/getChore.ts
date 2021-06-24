import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { getChore } from "../db/chore";
import { RecordType } from "../db/record";

export const route = {
    path: "/api/v2/getChore",
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

        if (!(await userCanAccessRecord(validationResult.user.id, req.body.choreId, RecordType.ChoreCompleted))) {
            res.send({
                failed: true,
                data: null,
            });
        }

        const data = await getChore(req.body.choreId);

        res.send({
            failed: false,
            data: data,
        });
    },
};