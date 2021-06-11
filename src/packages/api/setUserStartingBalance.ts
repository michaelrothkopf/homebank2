import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { getUserStartingBalance, setUserAllowance, setUserStartingBalance } from "../db/user";

export = {
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

        const data = await setUserStartingBalance(validationResult.user.id, req.body.newBalance);

        res.send({
            failed: false,
            data: data,
        });
    },
};