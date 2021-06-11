import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { getUserStartingBalance, setUserAllowance } from "../db/user";

export = {
    path: "/api/v2/setUserAllowance",
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

        const data = await setUserAllowance(validationResult.user.id, req.body.newAllowance);

        res.send({
            failed: false,
            data: data,
        });
    },
};