import mysql2 from "mysql2";
import { loadJson } from "../lib/loadJson";

/**
 * The MySQL connection to the database
 * */
export const connection = mysql2.createConnection(
    loadJson("../config/database.json").production ? loadJson("../config/database.json").prodDbConfig : loadJson("../config/database.json").devDbConfig
);