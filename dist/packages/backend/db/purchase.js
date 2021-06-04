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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserPurchase = exports.logUserPurchase = exports.getPurchaseById = exports.getHouseholdPurchases = exports.getUserPurchases = void 0;
const connection_1 = require("./connection");
const user_1 = require("./user");
const getUserPurchases = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM purchases WHERE user=?;`, [userId], (err, result) => {
                resolve(result);
            });
        }
        catch (_a) {
            reject("Error getting user purchases.");
        }
    });
});
exports.getUserPurchases = getUserPurchases;
const getHouseholdPurchases = (household) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM purchases WHERE household=?;`, [household], (err, result) => {
                resolve(result);
            });
        }
        catch (_a) {
            reject("Error getting user purchases.");
        }
    });
});
exports.getHouseholdPurchases = getHouseholdPurchases;
const getPurchaseById = (purchaseId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM purchases WHERE id=?;`, [purchaseId], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error getting user purchases.");
        }
    });
});
exports.getPurchaseById = getPurchaseById;
const logUserPurchase = (userId, item, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const household = yield user_1.getUserHousehold(userId);
    connection_1.connection.query(`INSERT INTO purchases (item, user, amount, household) VALUES (?, ?, ?, '?')`, [item, userId, amount, household], (err) => {
        return;
    });
});
exports.logUserPurchase = logUserPurchase;
const removeUserPurchase = (purchaseId) => __awaiter(void 0, void 0, void 0, function* () {
    connection_1.connection.query(`DELETE FROM purchases WHERE id=?;`, [purchaseId], (err) => {
        return;
    });
});
exports.removeUserPurchase = removeUserPurchase;
