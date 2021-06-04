"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRoutes = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const genRoutes = (app) => {
    const apiRouteDirFiles = fs_1.readdirSync(path_1.join(__dirname, "api"));
    const modules = Promise.all(apiRouteDirFiles.map(file => Promise.resolve().then(() => __importStar(require(path_1.join(__dirname, "api", file))))));
    modules.then((apiRoutes) => {
        for (const apiRoute of apiRoutes) {
            if (apiRoute.disabled === true) {
                continue;
            }
            switch (apiRoute.method) {
                case "get":
                    app.get(apiRoute.path, apiRoute.route);
                    break;
                case "head":
                    app.head(apiRoute.path, apiRoute.route);
                    break;
                case "put":
                    app.put(apiRoute.path, apiRoute.route);
                    break;
                case "delete":
                    app.delete(apiRoute.path, apiRoute.route);
                    break;
                case "connect":
                    app.connect(apiRoute.path, apiRoute.route);
                    break;
                case "options":
                    app.options(apiRoute.path, apiRoute.route);
                    break;
                case "trace":
                    app.trace(apiRoute.path, apiRoute.route);
                    break;
                case "patch":
                    app.patch(apiRoute.path, apiRoute.route);
                    break;
                default:
                    app.post(apiRoute.path, apiRoute.route);
            }
        }
    });
};
exports.genRoutes = genRoutes;
