import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { getUserStartingBalance, setUserAllowance, setUserStartingBalance } from "../db/user";
import { RecordType } from "../db/record";

export const route = {
    path: "/api/v2/setUserStartingBalance",
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

        if (!(await userCanAccessRecord(validationResult.user.id, req.body.userId, RecordType.User))) {
            res.send({
                failed: true,
                data: null
            });
            return;
        }

        const data = await setUserStartingBalance(req.body.userId, req.body.newBalance);

        res.send({
            failed: false,
            data: data,
        });
    },
};