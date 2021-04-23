import { connection } from "./connection";
import { RowDataPacket } from "mysql2";

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