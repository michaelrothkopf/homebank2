import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { UserType } from "../db/user";
import { getHouseholdChoresCompleted } from "../db/completedChore";

export = {
    path: "/getHouseholdChoresCompleted",
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

        const data = await getHouseholdChoresCompleted(validationResult.user.household);

        res.send({
            failed: false,
            data: data,
        });
    },
};