import { Request, Response } from "../lib/expressTypes";
import { getHousehold, getHouseholdUsers } from "../db/household";
import { tokenIsValid, userCanAccessRecord } from "../auth/verifyAuth";
import { getUserTotalBalance, UserType } from "../db/user";
import { RecordType } from "../db/record";

export const route = {
    path: "/api/v2/getHouseholdUserBalances",
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

        const data = await getHouseholdUsers(validationResult.user.household);

        for (const user of data) {
            const totalBalance = await getUserTotalBalance(user.id);

            user.totalBalance = totalBalance;
        }

        res.send({
            failed: false,
            data: data,
        });
    },
};