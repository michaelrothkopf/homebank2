import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { getUserAllowance } from "../db/user";

export = {
    path: "/getUserAllowance",
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

        const data = await getUserAllowance(validationResult.user.id);

        res.send({
            failed: false,
            data: data,
        });
    },
};