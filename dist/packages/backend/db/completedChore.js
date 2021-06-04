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
exports.getHouseholdChoresCompleted = exports.removeCompletedChore = exports.logCompletedChore = exports.getCompletedChore = exports.getUserChoresCompleted = void 0;
const connection_1 = require("./connection");
const user_1 = require("./user");
const getUnixTime_1 = __importDefault(require("../../../common/getUnixTime"));
const getUserChoresCompleted = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM chores_completed WHERE user=?;`, [userId], (err, result) => {
                resolve(result);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getUserChoresCompleted = getUserChoresCompleted;
const getCompletedChore = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM chores_completed WHERE user=?;`, [userId], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getCompletedChore = getCompletedChore;
const logCompletedChore = (userId, choreId) => __awaiter(void 0, void 0, void 0, function* () {
    const household = yield user_1.getUserHousehold(userId);
    connection_1.connection.query(`INSERT INTO chores_completed (chore, time_completed, user, household) VALUES (?, ?, ?, '?')`, [choreId, getUnixTime_1.default(), userId, household], (err) => {
        return;
    });
});
exports.logCompletedChore = logCompletedChore;
const removeCompletedChore = (choreId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`DELETE FROM chores_completed WHERE id=?;`, [choreId], (err, result) => {
                resolve(true);
            });
        }
        catch (_a) {
            reject(false);
        }
    });
});
exports.removeCompletedChore = removeCompletedChore;
const getHouseholdChoresCompleted = (householdId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM chores_completed WHERE id=?;`, [householdId], (err, result) => {
                resolve(result);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getHouseholdChoresCompleted = getHouseholdChoresCompleted;
