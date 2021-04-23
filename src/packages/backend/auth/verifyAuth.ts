import { connection } from "../db/connection";
import { sha256 } from "../crypto/createHash";
import { getUser, getUserByUsername, User, UserType } from "../db/user";
import { RowDataPacket } from "mysql2";
import { generateUuid } from "../crypto/uuid";
import getUnixTime from "../../../common/getUnixTime";
import { RecordType } from "../db/record";
import { getChore } from "../db/chore";
import { getCompletedChore } from "../db/completedChore";
import { getHouseholdById } from "../db/household";
import { getPurchaseById } from "../db/purchase";

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

export const userCanAccessRecord = async (userId: number, recordId: number, recordType: RecordType): Promise<boolean> => {
    const user = await getUser(userId);
    try {
        switch (recordType) {
            case RecordType.Bonus:
                return false;
            case RecordType.Chore:
                const chore = await getChore(recordId);
                return user.household == chore.household;
            case RecordType.ChoreCompleted:
                const choreCompleted = await getCompletedChore(recordId);
                return (
                    (user.role == UserType.Parent && user.household == choreCompleted.household) ||
                    (user.role == UserType.Child && user.id == choreCompleted.user)
                );
            case RecordType.Household:
                const household = await getHouseholdById(recordId);
                return household.code == user.household;
            case RecordType.Purchase:
                const purchase = await getPurchaseById(recordId);
                return (
                    (user.role == UserType.Parent && user.household == purchase.household) ||
                    (user.role == UserType.Child && user.id == purchase.user)
                );
            case RecordType.User:
                const recordUser = await getUser(recordId);
                return (
                    (user.role == UserType.Parent && user.household == recordUser.household) ||
                    (user.role == UserType.Child && user.id == recordUser.id)
                );
            default:
                return false;
        }
    } catch {
        return false;
    }
}