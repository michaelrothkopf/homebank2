import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { getUser, UserType } from "../db/user";
import { RecordType } from "../db/record";

export const route = {
    path: "/api/v2/getUser",
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

        let data;

        if (req.body.userId === null)
        {
            data = await getUser(validationResult.user.id);
        } else {
            if (!(await userCanAccessRecord(validationResult.user.id, req.body.userId, RecordType.User))) {
                res.send({
                    failed: true,
                    data: null
                });
                return;
            }
    
            data = await getUser(req.body.userId);
        }

        res.send({
            failed: false,
            data: data,
        });
    },
};