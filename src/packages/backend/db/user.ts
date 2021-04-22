import { connection } from "./connection";
import { RowDataPacket } from "mysql2";

export enum UserType {
    Child = 'child',
    Parent = 'parent',
}

export interface User extends RowDataPacket {
    id: number,
    username: string,
    password: string,
    time_created: number,
    balance: number,
    role: UserType,
    allowance: number,
    household: string,
    nickname: string,
}

export const getUser = async (userId: number): Promise<User> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?`, [userId], (err, result: User[]) => {
                resolve(result[0]);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

export const getUserNickname = async (userId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?`, [userId], (err, result: User[]) => {
                resolve(result[0].nickname);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

export const getUserHousehold = async (userId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM users WHERE id=?`, [userId], (err, result: User[]) => {
                resolve(result[0].household);
            })
        } catch {
            reject("Error getting user by ID.");
        }
    });
}

export const getUserChores = async (userId: number) => {
    
}

export const getUserTotalBalance = async (userId: number) => {

}