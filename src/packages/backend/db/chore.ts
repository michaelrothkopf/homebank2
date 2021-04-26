import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import getUnixTime from "../../../common/getUnixTime";

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
            connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err, result: Chore[]) => {
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
            connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err, result: Chore[]) => {
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
            connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err, result: Chore[]) => {
                resolve(result[0].value);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

export const getHouseholdChores = async (household: string): Promise<Chore[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE household='?';`, [household], (err, result: Chore[]) => {
                resolve(result);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

export const addHouseholdChore = async (household: string, name: string, value: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`INSERT INTO chores (household, name, value, time_created) VALUES ('?', '?', ?, ?);`, [household, name, value, getUnixTime()], (err, ) => {
                resolve(true);
            })
        } catch {
            reject(false);
        }
    });
}

export const removeHouseholdChore = async (choreId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`DELETE FROM chores WHERE id=?;`, [choreId], (err, ) => {
                resolve(true);
            })
        } catch {
            reject(false);
        }
    })
}