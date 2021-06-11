import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { UserType } from "../db/user";
import { removeCompletedChore } from "../db/completedChore";
import { RecordType } from "../db/record";

export = {
    path: "/api/v2/removeCompletedChore",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const validationResult = await tokenIsValid(req.cookies.loginKey);

        if (!validationResult.success || !validationResult.user || validationResult.user.role != UserType.Parent) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }

        if (!(await userCanAccessRecord(validationResult.user.id, req.body.choreId, RecordType.ChoreCompleted))) {
            res.send({
                failed: true,
                data: null
            });
        }

        const data = await removeCompletedChore(req.body.choreId);

        res.send({
            failed: false,
            data: data,
        });
    },
};