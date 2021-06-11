import { Request, Response } from "../lib/expressTypes";
import { getHousehold, getHouseholdUsers } from "../db/household";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { UserType } from "../db/user";
import { RecordType } from "../db/record";

export = {
    path: "/getHouseholdUsers",
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

        const data = await getHouseholdUsers(validationResult.user.household);

        res.send({
            failed: false,
            data: data,
        });
    },
};