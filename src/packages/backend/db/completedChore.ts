import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { getUserHousehold } from "./user";
import getUnixTime from "../../../common/getUnixTime";

/**
 * Interface for a Completed Chore row in the database
 * */
export interface CompletedChore extends RowDataPacket {
    id: number,
    chore: number,
    time_completed: number,
    user: number,
    household: string,
}

/**
 * Gets a list of a user's completed chores given a user ID
 * @param userId
 */
export const getUserChoresCompleted = async (userId: number): Promise<CompletedChore[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores_completed WHERE user=?;`, [userId], (err, result: CompletedChore[]) => {
                resolve(result);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

/**
 * Gets a Completed Chore object from the database given a chore ID
 * @param userId
 */
export const getCompletedChore = async (userId: number): Promise<CompletedChore> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores_completed WHERE user=?;`, [userId], (err, result: CompletedChore[]) => {
                resolve(result[0]);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

/**
 * Adds a new completed chore given a user ID and a chore ID
 * @param userId
 * @param choreId
 */
export const logCompletedChore = async (userId: number, choreId: number): Promise<void> => {
    const household = await getUserHousehold(userId);
    connection.query(`INSERT INTO chores_completed (chore, time_completed, user, household) VALUES (?, ?, ?, '?')`, [choreId, getUnixTime(), userId, household], (err) => {
        return;
    });
}

/**
 * Removes a completed chore given a chore ID
 * @param choreId
 */
export const removeCompletedChore = async (choreId: number) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`DELETE FROM chores_completed WHERE id=?;`, [choreId], (err, result: any) => {
                resolve(true);
            })
        } catch {
            reject(false);
        }
    });
}

/**
 * Gets a list of a household's chores completed given a household code
 * @param household
 */
export const getHouseholdChoresCompleted = async (household: string): Promise<CompletedChore[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores_completed WHERE id=?;`, [household], (err, result: CompletedChore[]) => {
                resolve(result);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}