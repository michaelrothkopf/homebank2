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
exports.removeHouseholdChore = exports.addHouseholdChore = exports.getHouseholdChores = exports.getChoreValue = exports.getChoreName = exports.getChore = void 0;
const connection_1 = require("./connection");
const getUnixTime_1 = __importDefault(require("../../../common/getUnixTime"));
const getChore = (choreId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getChore = getChore;
const getChoreName = (choreId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err, result) => {
                resolve(result[0].name);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getChoreName = getChoreName;
const getChoreValue = (choreId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err, result) => {
                resolve(result[0].value);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getChoreValue = getChoreValue;
const getHouseholdChores = (household) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM chores WHERE household='?';`, [household], (err, result) => {
                resolve(result);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getHouseholdChores = getHouseholdChores;
const addHouseholdChore = (household, name, value) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`INSERT INTO chores (household, name, value, time_created) VALUES ('?', '?', ?, ?);`, [household, name, value, getUnixTime_1.default()], (err) => {
                resolve(true);
            });
        }
        catch (_a) {
            reject(false);
        }
    });
});
exports.addHouseholdChore = addHouseholdChore;
const removeHouseholdChore = (choreId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`DELETE FROM chores WHERE id=?;`, [choreId], (err) => {
                resolve(true);
            });
        }
        catch (_a) {
            reject(false);
        }
    });
});
exports.removeHouseholdChore = removeHouseholdChore;
