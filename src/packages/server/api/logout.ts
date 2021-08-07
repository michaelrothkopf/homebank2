import { Request, Response } from "../lib/expressTypes";
import { verifyLogin } from "../auth/verifyAuth";

export const route = {
    path: "/api/v2/logout",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        res.cookie("loginKey", 'null', { expires: new Date, maxAge: 0 });

        res.send({
            failed: false,
            data: "Successfully logged out!"
        })
    },
};