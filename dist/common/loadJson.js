"use strict";
const path_1 = require("path");
const fs_1 = require("fs");
module.exports = (path) => {
    return JSON.parse(fs_1.readFileSync(path_1.join(__dirname, path)).toString());
};
