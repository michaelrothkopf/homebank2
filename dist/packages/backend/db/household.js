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
exports.getHouseholdById = exports.getHouseholdUsers = exports.getHousehold = void 0;
const connection_1 = require("./connection");
const getHousehold = (code) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM households WHERE code='?';`, [code], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getHousehold = getHousehold;
const getHouseholdUsers = (code) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM users WHERE household='?';`, [code], (err, result) => {
                resolve(result);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getHouseholdUsers = getHouseholdUsers;
const getHouseholdById = (householdId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            connection_1.connection.query(`SELECT * FROM households WHERE id=?;`, [householdId], (err, result) => {
                resolve(result[0]);
            });
        }
        catch (_a) {
            reject("Error getting chore.");
        }
    });
});
exports.getHouseholdById = getHouseholdById;
