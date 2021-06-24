import { Request, Response } from "../lib/expressTypes";
import { verifyLogin } from "../auth/verifyAuth";

export const route = {
    path: "/api/v2/login",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const response = await verifyLogin(req.body.username, req.body.password);

        if (response.success) {
            res.cookie("loginKey", response.loginKey, { httpOnly: true });

            res.send({
                failed: false,
                data: response.loginKey,
            });
        } else {
            res.send({
                failed: true,
                data: null,
            })
        }
    },
};