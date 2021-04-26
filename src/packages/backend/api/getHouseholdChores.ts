import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { UserType } from "../db/user";
import { getHouseholdChores } from "../db/chore";

export = {
    path: "/getHouseholdChores",
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

        const data = await getHouseholdChores(validationResult.user.household);

        res.send({
            failed: false,
            data: data,
        });
    },
};