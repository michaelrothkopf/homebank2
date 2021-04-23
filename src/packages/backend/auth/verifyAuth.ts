import { connection } from "../db/connection";
import { sha256 } from "../crypto/createHash";
import { getUser, getUserByUsername, User, UserType } from "../db/user";
import { RowDataPacket } from "mysql2";
import { generateUuid } from "../crypto/uuid";
import getUnixTime from "../../../common/getUnixTime";

export interface LoginKey extends RowDataPacket {
    id: number,
    login_key: string,
    time_created: number,
    length: number,
    user: number,
}

export interface LoginAttemptResult {
    loginKey: string,
    success: boolean,
    user?: User,
}

const LOGIN_KEY_LENGTH = 2592000;

export const addLoginKey = async (userId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const key = generateUuid();
            connection.query(`INSERT INTO login_keys (login_key, time_created, length, user) VALUES ('?', ?, ?, ?)`, [key, getUnixTime(), LOGIN_KEY_LENGTH, userId], (err, result: LoginKey[]) => {
                resolve(key);
            })
        } catch {
            reject("Error adding login key.");
        }
    });
}

export const verifyLogin = async (username: string, password: string): Promise<LoginAttemptResult> => {
    const hashedPassword = sha256(password);

    const user = await getUserByUsername(username);

    if (user.password = hashedPassword) {
        const loginKey = await addLoginKey(user.id);
        const result: LoginAttemptResult = {
            user,
            loginKey,
            success: true,
        };
        return result;
    } else {
        const result: LoginAttemptResult = {
            user,
            loginKey: '',
            success: false,
        };
        return result;
    }
}

export const getLoginKey = async (loginKey: string): Promise<LoginKey> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM login_keys WHERE login_key='?';`, [loginKey], (err, result: LoginKey[]) => {
                resolve(result[0]);
            })
        } catch {
            reject("Error adding login key.");
        }
    });
}

export const tokenIsValid = async (loginKey: string): Promise<LoginAttemptResult> => {
    try {
        const key = await getLoginKey(loginKey);
        const user = await getUser(key.user);

        const result: LoginAttemptResult = {
            loginKey,
            user,
            success: true
        };

        return result;
    } catch {
        const result: LoginAttemptResult = {
            loginKey: loginKey,
            success: false
        };
        return result;
    }
}