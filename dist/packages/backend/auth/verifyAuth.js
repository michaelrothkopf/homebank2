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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCanAccessRecord = exports.tokenIsValid = exports.getLoginKey = exports.verifyLogin = exports.addLoginKey = void 0;
const connection_1 = require("../db/connection");
const createHash_1 = require("../crypto/createHash");
const user_1 = require("../db/user");
const uuid_1 = require("../crypto/uuid");
const getUnixTime_1 = __importDefault(require("../../../common/getUnixTime"));
const record_1 = require("../db/record");
const chore_1 = require("../db/chore");
const completedChore_1 = require("../db/completedChore");
const household_1 = require("../db/household");
const purchase_1 = require("../db/purchase");
const LOGIN_KEY_LENGTH = 2592000;
const addLoginKey = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            const key = uuid_1.generateUuid();
            connection_1.connection.query(`INSERT INTO login_keys (login_key, time_created, length, user) VALUES ('?', ?, ?, ?)`, [key, getUnixTime_1.default(), LOGIN_KEY_LENGTH, userId], (err, result) => {
                resolve(key);
            });
        }
        catch (_a) {
            reject("Error adding login key.");
        }
    });
});
exports.addLoginKey = addLoginKey;
const verifyLogin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = createHash_1.sha256(password);
    const user = yield user_1.getUserByUsername(username);
    if (user.password = hashedPassword) {
        const loginKey = yield exports.addLoginKey(user.id);
        const result = {
            user,
            loginKey,
            success: true,
        };
        return result;
    }
    else {
        const result = {
            user,
            loginKey: '',
            success: false,
        };
        return result;
    }
});
exports.verifyLogin = verifyLogin;
const getLoginKey = (loginKey) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM login_keys WHERE login_key='?';`, [loginKey], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error adding login key.");
        }
    });
});
exports.getLoginKey = getLoginKey;
const tokenIsValid = (loginKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = yield exports.getLoginKey(loginKey);
        const user = yield user_1.getUser(key.user);
        const result = {
            loginKey,
            user,
            success: true
        };
        return result;
    }
    catch (_a) {
        const result = {
            loginKey: loginKey,
            success: false
        };
        return result;
    }
});
exports.tokenIsValid = tokenIsValid;
const userCanAccessRecord = (userId, recordId, recordType) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.getUser(userId);
    try {
        switch (recordType) {
            case record_1.RecordType.Bonus:
                return false;
            case record_1.RecordType.Chore:
                const chore = yield chore_1.getChore(recordId);
                return user.household == chore.household;
            case record_1.RecordType.ChoreCompleted:
                const choreCompleted = yield completedChore_1.getCompletedChore(recordId);
                return ((user.role == user_1.UserType.Parent && user.household == choreCompleted.household) ||
                    (user.role == user_1.UserType.Child && user.id == choreCompleted.user));
            case record_1.RecordType.Household:
                const household = yield household_1.getHouseholdById(recordId);
                return household.code == user.household;
            case record_1.RecordType.Purchase:
                const purchase = yield purchase_1.getPurchaseById(recordId);
                return ((user.role == user_1.UserType.Parent && user.household == purchase.household) ||
                    (user.role == user_1.UserType.Child && user.id == purchase.user));
            case record_1.RecordType.User:
                const recordUser = yield user_1.getUser(recordId);
                return ((user.role == user_1.UserType.Parent && user.household == recordUser.household) ||
                    (user.role == user_1.UserType.Child && user.id == recordUser.id));
            default:
                return false;
        }
    }
    catch (_b) {
        return false;
    }
});
exports.userCanAccessRecord = userCanAccessRecord;
