import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { User } from "./user";
import { generateUuid } from "../crypto/uuid";

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
            connection.query(`SELECT * FROM households WHERE code=?;`, [code], (err: any, result: Household[]) => {
                resolve(result[0]);
            });
        } catch {
            reject("Error getting household.");
        }
    });
}

/**
 * Creates a household in the database
 * @param name The household name
 * @param time_created The time the household was created
 * @returns The household object
 */
export const createHousehold = async (name: string, time_created: number): Promise<Household> => {
    return new Promise((resolve, reject) => {
        try {
            const code = generateUuid().substr(0, 5);

            connection.query(`INSERT INTO households (name, time_created, code) VALUES (?, ?, ?);`, [name, time_created, code], async (err) => {
                const result = await getHousehold(code);

                resolve(result);
            });
        } catch {
            reject("Error creating household.");
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
            connection.query(`SELECT * FROM users WHERE household=?;`, [code], (err: any, result: User[]) => {
                for (const user of result)
                {
                    delete user.password;
                }

                resolve(result);
            });
        } catch {
            reject("Error getting household users.");
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
            connection.query(`SELECT * FROM households WHERE id=?;`, [householdId], (err: any, result: Household[]) => {
                resolve(result[0]);
            });
        } catch {
            reject("Error getting household by ID.");
        }
    });
}