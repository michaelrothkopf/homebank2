import { connection } from "./connection";
import { RowDataPacket } from "mysql2";

export interface Household extends RowDataPacket {
    id: number,
    name: string,
    time_created: number,
    code: string,
}

export const getHousehold = async (code: string): Promise<Household> => {
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

export const getHouseholdById = async (householdId: number): Promise<Household> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM households WHERE id=?;`, [householdId], (err, result: Household[]) => {
                resolve(result[0]);
            });
        } catch {
            reject("Error getting chore.");
        }
    });
}