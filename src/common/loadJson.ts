import { join as joinPaths } from "path";
import { readFileSync } from "fs";

export = (path: string): Object => {
    return JSON.parse(readFileSync(joinPaths(__dirname, path)).toString());
}