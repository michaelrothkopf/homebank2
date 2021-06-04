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
exports.getUserTotalBalance = exports.getUserDateCreated = exports.setUserAllowance = exports.getUserAllowance = exports.setUserStartingBalance = exports.getUserStartingBalance = exports.getUserHousehold = exports.getUserNickname = exports.getUserByUsername = exports.getUser = exports.UserType = void 0;
const connection_1 = require("./connection");
const completedChore_1 = require("./completedChore");
const chore_1 = require("./chore");
const purchase_1 = require("./purchase");
const getWeekDifference_1 = require("../lib/getWeekDifference");
var UserType;
(function (UserType) {
    UserType["Child"] = "child";
    UserType["Parent"] = "parent";
})(UserType = exports.UserType || (exports.UserType = {}));
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error getting user by ID.");
        }
    });
});
exports.getUser = getUser;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE username='?';`, [username], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error getting user by ID.");
        }
    });
});
exports.getUserByUsername = getUserByUsername;
const getUserNickname = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err, result) => {
                resolve(result[0].nickname);
            });
        }
        catch (_a) {
            reject("Error getting user by ID.");
        }
    });
});
exports.getUserNickname = getUserNickname;
const getUserHousehold = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err, result) => {
                resolve(result[0].household);
            });
        }
        catch (_a) {
            reject("Error getting user by ID.");
        }
    });
});
exports.getUserHousehold = getUserHousehold;
const getUserStartingBalance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err, result) => {
                resolve(result[0].balance);
            });
        }
        catch (_a) {
            reject("Error getting user by ID.");
        }
    });
});
exports.getUserStartingBalance = getUserStartingBalance;
const setUserStartingBalance = (userId, newBalance) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`UPDATE users SET balance=? WHERE id=?;`, [newBalance], (err, result) => {
                resolve();
            });
        }
        catch (_a) {
            reject("Error setting user starting balance.");
        }
    });
});
exports.setUserStartingBalance = setUserStartingBalance;
const getUserAllowance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err, result) => {
                resolve(result[0].allowance);
            });
        }
        catch (_a) {
            reject("Error getting user by ID.");
        }
    });
});
exports.getUserAllowance = getUserAllowance;
const setUserAllowance = (userId, newAllowance) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`UPDATE users SET allowance=? WHERE id=?;`, [newAllowance], (err, result) => {
                resolve();
            });
        }
        catch (_a) {
            reject("Error setting user starting balance.");
        }
    });
});
exports.setUserAllowance = setUserAllowance;
const getUserDateCreated = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err, result) => {
                resolve(new Date(result[0].time_created));
            });
        }
        catch (_a) {
            reject("Error getting user by ID.");
        }
    });
});
exports.getUserDateCreated = getUserDateCreated;
const getUserTotalBalance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const startingBalance = yield exports.getUserStartingBalance(userId);
    const choresCompleted = yield completedChore_1.getUserChoresCompleted(userId);
    let balance = startingBalance;
    for (const chore of choresCompleted) {
        const choreValue = yield chore_1.getChoreValue(chore.id);
        balance += choreValue;
    }
    const userPurchases = yield purchase_1.getUserPurchases(userId);
    for (const purchase of userPurchases) {
        balance -= purchase.amount;
    }
    const allowance = yield exports.getUserAllowance(userId);
    const dateAccountCreated = yield exports.getUserDateCreated(userId);
    const weeksSinceCreated = getWeekDifference_1.getWeekDifference(new Date(), dateAccountCreated);
    balance += allowance * weeksSinceCreated;
    return balance;
});
exports.getUserTotalBalance = getUserTotalBalance;
