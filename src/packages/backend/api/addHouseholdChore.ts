import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { UserType } from "../db/user";
import { addHouseholdChore } from "../db/chore";
import { getHousehold } from "../db/household";
import { RecordType } from "../db/record";

export = {
    path: "/addHouseholdChore",
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

        if (!(await userCanAccessRecord(validationResult.user.id, (await getHousehold(validationResult.user.household)).id, RecordType.Household))) {
            res.send({
                failed: true,
                data: null
            });
        }

        const data = await addHouseholdChore(validationResult.user.household, req.body.name, req.body.value);

        res.send({
            failed: false,
            data: data,
        });
    },
};