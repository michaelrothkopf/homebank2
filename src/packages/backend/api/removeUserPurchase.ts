import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";
import { removeUserPurchase } from "../db/purchase";

export = {
    path: "/removeUserPurchase",
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

        const data = await removeUserPurchase(req.body.purchaseId);

        res.send({
            failed: false,
            data: data,
        });
    },
};