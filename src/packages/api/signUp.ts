import { Request, Response } from "../lib/expressTypes";
import { signUp } from "../auth/verifyAuth";
import getUnixTime from "../lib/getUnixTime";

export = {
    path: "/api/v2/signUp",
    method: 'post',
    disabled: false,
    route: async (req: Request, res: Response) => {
        const response = await signUp(req.body.username, req.body.password, getUnixTime(), 0, req.body.userType, 10, req.body.nickname, req.body.household);

        if (response.success === true)
        {
            res.redirect('/login');
        }
        else
        {
            res.send({failed: true, error: response.error});
        }
    },
};