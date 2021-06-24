import { join as joinPaths } from "path";
import { readFileSync } from "fs";

export const loadJson = (path: string): any => {
    return JSON.parse(readFileSync(joinPaths(__dirname, path)).toString());
}