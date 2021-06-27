import { Request, Response } from "../lib/expressTypes";
import { tokenIsValid } from "../auth/verifyAuth";

export const route = {
    path: "/api/v2/checkLoginStatus",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const validationResult = await tokenIsValid(req.cookies.loginKey);

        if (!validationResult.success || !validationResult.user) {
            res.send({
                failed: false,
                data: { loggedIn: false },
            });
        } else {
            res.send({
                failed: false,
                data: { loggedIn: true, role: validationResult.user.role },
            });
        }
    },
};