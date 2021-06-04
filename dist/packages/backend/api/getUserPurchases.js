"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const verifyAuth_1 = require("../auth/verifyAuth");
const purchase_1 = require("../db/purchase");
module.exports = {
    path: "/getUserPurchases",
    method: 'post',
    disabled: false,
    route: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const validationResult = yield verifyAuth_1.tokenIsValid(req.cookies.loginKey);
        if (!validationResult.success || !validationResult.user) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }
        const data = yield purchase_1.getUserPurchases(validationResult.user.id);
        res.send({
            failed: false,
            data: data,
        });
    }),
};
