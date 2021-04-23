import { connection } from "./connection";
import { RowDataPacket } from "mysql2";

export interface Household extends RowDataPacket {
    id: number,
    name: string,
    time_created: number,
    code: string,
}

export const getHousehold = async (code: string) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM households WHERE code='?';`, [code], (err, result: Household[]) => {
                resolve(result[0]);
            });
        } catch {
            reject("Error getting chore.");
        }
    });
}