import { connection } from "./connection";
import { RowDataPacket } from "mysql2";
import { getUserChoresCompleted } from "./completedChore";
import { getChoreValue } from "./chore";
import { getUserPurchases } from "./purchase";
import { getWeekDifference } from "../lib/getWeekDifference";

/**
 * Enum type for the Child and Parent user types
 * */
export enum UserType {
    Child = 'child',
    Parent = 'parent',
}

/**
 * Interface for a User row in the database
 * */
export interface User extends RowDataPacket {
    id: number,
    username: string,
    password?: string,
    time_created: number,
    balance: number,
    role: UserType,
    allowance: number,
    household: string,
    nickname: string,
    totalBalance?: number,
}

/**
 * Gets a User object from the database given a user ID
 * @param userId
 */
export const getUser = async (userId: number): Promise<User> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err: any, result: User[]) => {
                const user = result[0];

                delete user.password;

                resolve(user);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Gets a User object from the database given a username
 * @param username
 */
export const getUserByUsername = async (username: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE username=?;`, [username], (err: any, result: User[]) => {
                delete result[0].password;

                resolve(result[0]);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Gets a User object from the database given a username for the authentication module
 * @param username
 */
 export const _getUserByUsername = async (username: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE username=?;`, [username], (err: any, result: User[]) => {
                resolve(result[0]);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Gets a user's nickname given a user ID
 * @param userId
 */
export const getUserNickname = async (userId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err: any, result: User[]) => {
                resolve(result[0].nickname);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Gets a user's household given a user ID
 * @param userId
 */
export const getUserHousehold = async (userId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err: any, result: User[]) => {
                resolve(result[0].household);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Gets a user's starting balance given a user ID
 * @param userId
 */
export const getUserStartingBalance = async (userId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err: any, result: User[]) => {
                resolve(result[0].balance);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Sets a user's starting balance given a user ID and new balance
 * @param userId
 * @param newBalance
 */
export const setUserStartingBalance = async (userId: number, newBalance: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`UPDATE users SET balance=? WHERE id=?;`, [newBalance, userId], (err: any, result: any) => {
                resolve();
            });
        } catch {
            reject("Error setting user starting balance.");
        }
    })
}

/**
 * Gets a user's allowance given a user ID
 * @param userId
 */
export const getUserAllowance = async (userId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err: any, result: User[]) => {
                resolve(result[0].allowance);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Sets a user's allowance given a user ID and new allowance
 * @param userId
 * @param newAllowance
 */
export const setUserAllowance = async (userId: number, newAllowance: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`UPDATE users SET allowance=? WHERE id=?;`, [newAllowance, userId], (err: any, result: any) => {
                resolve();
            });
        } catch {
            reject("Error setting user starting balance.");
        }
    })
}

/**
 * Gets a user's date of account creation given a user ID 
 * @param userId
 */
export const getUserDateCreated = async (userId: number): Promise<Date> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?;`, [userId], (err: any, result: User[]) => {
                resolve(new Date(result[0].time_created));
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

/**
 * Gets a user's total balance given a user ID
 * @param userId
 */
export const getUserTotalBalance = async (userId: number) => {
    const startingBalance = await getUserStartingBalance(userId);
    const choresCompleted = await getUserChoresCompleted(userId);

    let balance = startingBalance;

    for (const chore of choresCompleted) {
        const choreValue = await getChoreValue(chore.id);

        balance += choreValue;
    }

    const userPurchases = await getUserPurchases(userId);

    for (const purchase of userPurchases) {
        balance -= purchase.amount;
    }

    const allowance = await getUserAllowance(userId);
    const dateAccountCreated = await getUserDateCreated(userId);
    const weeksSinceCreated = getWeekDifference(new Date(), dateAccountCreated);
    balance += allowance * weeksSinceCreated;

    return balance;
}