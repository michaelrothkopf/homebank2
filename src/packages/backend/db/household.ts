import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { User } from "./user";

/**
 * Interface for a household row in the database
 * */
export interface Household extends RowDataPacket {
    id: number,
    name: string,
    time_created: number,
    code: string,
}

/**
 * Gets a Household object from the database given a household code
 * @param code
 */
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

/**
 * Gets a list of a household's attached users given a household code
 * @param code
 */
export const getHouseholdUsers = async (code: string): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE household='?';`, [code], (err, result: User[]) => {
                resolve(result);
            });
        } catch {
            reject("Error getting chore.");
        }
    });
}

/**
 * Gets a Household object from the database given a household ID
 * @param householdId
 */
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