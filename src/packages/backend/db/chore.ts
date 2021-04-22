import { connection } from "./connection";
import { RowDataPacket } from "mysql2";

export interface Chore extends RowDataPacket {
    id: number,
    household: string,
    name: string,
    value: number,
    time_created: number,
}

export const getChore = async (choreId: number): Promise<Chore> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE id=?`, [choreId], (err, result: Chore[]) => {
                resolve(result[0]);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

export const getChoreName = async (choreId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE id=?`, [choreId], (err, result: Chore[]) => {
                resolve(result[0].name);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

export const getChoreValue = async (choreId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE id=?`, [choreId], (err, result: Chore[]) => {
                resolve(result[0].value);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}