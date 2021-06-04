"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekDifference = void 0;
const getWeekDifference = (date2, date1) => {
    let diff = (date2.getTime() - date1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    return Math.abs(Math.round(diff));
};
exports.getWeekDifference = getWeekDifference;
