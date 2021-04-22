import mysql2 from "mysql2";
import loadJson from "../../../common/loadJson";

export const connection = mysql2.createConnection(loadJson("../../../config/database.json"));