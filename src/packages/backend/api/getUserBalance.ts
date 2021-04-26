import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { getUserTotalBalance } from "../db/user";

export = {
    path: "/getUserBalance",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const validationResult = await tokenIsValid(req.cookies.loginToken);

        if (!validationResult.success || !validationResult.user) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }

        const data = await getUserTotalBalance(validationResult.user.id);

        res.send({
            failed: false,
            data: data,
        });
    },
};