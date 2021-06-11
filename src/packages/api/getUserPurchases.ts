import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { getUserPurchases } from "../db/purchase";

export = {
    path: "/api/v2/getUserPurchases",
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

        const data = await getUserPurchases(validationResult.user.id);

        res.send({
            failed: false,
            data: data,
        });
    },
};