import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { UserType } from "../db/user";
import { addHouseholdChore } from "../db/chore";

export = {
    path: "/addHouseholdChore",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const validationResult = await tokenIsValid(req.cookies.loginToken);

        if (!validationResult.success || !validationResult.user || validationResult.user.role != UserType.Parent) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }

        const data = await addHouseholdChore(validationResult.user.household, req.body.name, req.body.value);

        res.send({
            failed: false,
            data: data,
        });
    },
};