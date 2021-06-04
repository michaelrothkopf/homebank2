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
const household_1 = require("../db/household");
const verifyAuth_1 = require("../auth/verifyAuth");
const user_1 = require("../db/user");
module.exports = {
    path: "/getHouseholdUsers",
    method: 'post',
    disabled: false,
    route: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const validationResult = yield verifyAuth_1.tokenIsValid(req.cookies.loginKey);
        if (!validationResult.success || !validationResult.user || validationResult.user.role != user_1.UserType.Parent) {
            res.send({
                failed: true,
                data: null,
            });
            return;
        }
        const data = yield household_1.getHouseholdUsers(validationResult.user.household);
        res.send({
            failed: false,
            data: data,
        });
    }),
};
