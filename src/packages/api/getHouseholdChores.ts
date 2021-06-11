import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { UserType } from "../db/user";
import { getHouseholdChores } from "../db/chore";
import { getHousehold } from "../db/household";
import { RecordType } from "../db/record";

export = {
    path: "/getHouseholdChores",
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

        const data = await getHouseholdChores(validationResult.user.household);

        res.send({
            failed: false,
            data: data,
        });
    },
};