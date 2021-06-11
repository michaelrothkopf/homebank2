import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { getHousehold } from "../db/household";

export = {
    path: "/api/v2/getHouseholdInfo",
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

        const data = await getHousehold(validationResult.user.household);

        res.send({
            failed: false,
            data: data,
        });
    },
};