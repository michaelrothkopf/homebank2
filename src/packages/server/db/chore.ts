import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { getUnixTime } from "../lib/getUnixTime";

/**
 * Interface for a Chore row in the databse
 * */
export interface Chore extends RowDataPacket {
    id: number,
    household: string,
    name: string,
    value: number,
    time_created: number,
}

/**
 * Gets a Chore object from the database given a chore ID
 * @param choreId
 */
export const getChore = async (choreId: number): Promise<Chore> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err: any, result: Chore[]) => {
                resolve(result[0]);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

/**
 * Gets a chore name from the database given a chore ID
 * @param choreId
 */
export const getChoreName = async (choreId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err: any, result: Chore[]) => {
                resolve(result[0].name);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

/**
 * Gets a chore value from the database given a chore ID
 * @param choreId
 */
export const getChoreValue = async (choreId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE id=?;`, [choreId], (err: any, result: Chore[]) => {
                resolve(result[0].value);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

/**
 * Gets a list of a household's chores given a household code
 * @param household
 */
export const getHouseholdChores = async (household: string): Promise<Chore[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores WHERE household=??';`, [household], (err: any, result: Chore[]) => {
                resolve(result);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

/**
 * Adds a new household chore given a household code, chore name, and chore value
 * @param household
 * @param name
 * @param value
 */
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

/**
 * Removes a household chore given a chore ID
 * @param choreId
 */
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