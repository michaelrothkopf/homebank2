import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { getUserHousehold } from "./user";

export interface Purchase extends RowDataPacket {
    id: number,
    item: string,
    user: number,
    amount: number,
    household: string,
}

export const getUserPurchases = async (userId: number): Promise<Purchase[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM purchases WHERE user=?;`, [userId], (err, result: Purchase[]) => {
                resolve(result);
            });
        } catch {
            reject("Error getting user purchases.");
        }
    });
}

export const getHouseholdPurchases = async (household: string): Promise<Purchase[]> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM purchases WHERE household=?;`, [household], (err, result: Purchase[]) => {
                resolve(result);
            });
        } catch {
            reject("Error getting user purchases.");
        }
    });
}

export const getPurchaseById = async (purchaseId: number): Promise<Purchase> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM purchases WHERE id=?;`, [purchaseId], (err, result: Purchase[]) => {
                resolve(result[0]);
            });
        } catch {
            reject("Error getting user purchases.");
        }
    });
}

export const logUserPurchase = async (userId: number, item: string, amount: number): Promise<void> => {
    const household = await getUserHousehold(userId);
    connection.query(`INSERT INTO purchases (item, user, amount, household) VALUES (?, ?, ?, '?')`, [item, userId, amount, household], (err) => {
        return;
    });
}

export const removeUserPurchase = async (purchaseId: number): Promise<void> => {
    connection.query(`DELETE FROM purchases WHERE id=?;`, [purchaseId], (err) => {
        return;
    });
}