import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { getUserHousehold } from "./user";
import { getUnixTime } from "../lib/getUnixTime";

/**
 * Interface for a purchase row in the database
 * */
export interface Purchase extends RowDataPacket {
    id: number,
    item: string,
    user: number,
    amount: number,
    household: string,
    time_added: number,
}

/**
 * Gets a list of a user's purchases given a user ID
 * @param userId
 */
export const getUserPurchases = async (userId: number): Promise<Purchase[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM purchases WHERE user=?;`, [userId], (err: any, result: Purchase[]) => {
                resolve(result);
            });
        } catch {
            reject("Error getting user purchases.");
        }
    });
}

/**
 * Gets a list of a household's purchases given a household ID
 * @param household
 */
export const getHouseholdPurchases = async (household: string): Promise<Purchase[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM purchases WHERE household=?;`, [household], (err: any, result: Purchase[]) => {
                resolve(result);
            });
        } catch {
            reject("Error getting user purchases.");
        }
    });
}


/**
 * Gets a Purchase object from the database given a purchase ID
 * @param purchaseId
 */
export const getPurchaseById = async (purchaseId: number): Promise<Purchase> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM purchases WHERE id=?;`, [purchaseId], (err: any, result: Purchase[]) => {
                resolve(result[0]);
            });
        } catch {
            reject("Error getting user purchases.");
        }
    });
}


/**
 * Adds a new purchase given a user ID, item name, and purchase amount
 * @param userId
 * @param item
 * @param amount
 */
export const logUserPurchase = async (userId: number, item: string, amount: number): Promise<void> => {
    const household = await getUserHousehold(userId);
    connection.query(`INSERT INTO purchases (item, user, amount, household, time_added) VALUES (?, ?, ?, ?, ?)`, [item, userId, amount, household, getUnixTime()], (err) => {
        return;
    });
}

/**
 * Removes a purchase given a purchase ID
 * @param purchaseId
 */
export const removeUserPurchase = async (purchaseId: number): Promise<void> => {
    connection.query(`DELETE FROM purchases WHERE id=?;`, [purchaseId], (err) => {
        return;
    });
}