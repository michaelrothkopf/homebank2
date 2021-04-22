import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { getUserHousehold } from "./user";
import getUnixTime from "../../../common/getUnixTime";

export interface CompletedChore extends RowDataPacket {
    id: number,
    chore: number,
    time_completed: number,
    user: number,
    household: string,
}

export const getHouseholdChores = async (householdId: string): Promise<CompletedChore[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores_completed WHERE id=?`, [householdId], (err, result: CompletedChore[]) => {
                resolve(result);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

export const getUserChores = async (userId: number): Promise<CompletedChore[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM chores_completed WHERE user=?`, [userId], (err, result: CompletedChore[]) => {
                resolve(result);
            })
        } catch {
            reject("Error getting chore.");
        }
    });
}

export const logCompletedChore = async (userId: number, choreId: number) => {
    const household = await getUserHousehold(userId);
    connection.query(`INSERT INTO chores_completed (chore, time_completed, user, household) VALUES (?, ?, ?, ?)`, [choreId, getUnixTime(), userId, household]);
}