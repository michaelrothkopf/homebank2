import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { removeUserPurchase } from "../db/purchase";
import { RecordType } from "../db/record";
import { UserType } from "../db/user";

export = {
    path: "/api/v2/removeUserPurchase",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const validationResult = await tokenIsValid(req.cookies.loginKey);

        if (!validationResult.success || !validationResult.user || validationResult.user.role != UserType.Parent) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }

        if (!(await userCanAccessRecord(validationResult.user.id, req.body.purchaseId, RecordType.Purchase))) {
            res.send({
                failed: true,
                data: null
            });
        }

        const data = await removeUserPurchase(req.body.purchaseId);

        res.send({
            failed: false,
            data: data,
        });
    },
};