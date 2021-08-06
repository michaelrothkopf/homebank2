import { connection } from "../db/connection";
import { sha256 } from "../crypto/createHash";
import { getUser, getUserByUsername, User, UserType, _getUserByUsername } from "../db/user";
import { RowDataPacket } from "mysql2";
import { generateUuid } from "../crypto/uuid";
import { getUnixTime } from "../lib/getUnixTime";
import { RecordType } from "../db/record";
import { getChore } from "../db/chore";
import { getCompletedChore } from "../db/completedChore";
import { createHousehold, getHouseholdById } from "../db/household";
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
    message: string,
}

export interface SignupAttemptResult {
    success: boolean,
    error?: string,
    user?: User,
}

const LOGIN_KEY_LENGTH = 2592000;

export const addLoginKey = async (userId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const key = generateUuid();
            connection.query(`INSERT INTO login_keys (login_key, time_created, length, user) VALUES (?, ?, ?, ?);`, [key, getUnixTime(), LOGIN_KEY_LENGTH, userId], (err: any, result: LoginKey[]) => {
                resolve(key);
            })
        } catch {
            reject("Error adding login key.");
        }
    });
}

export const verifyLogin = async (username: string, password: string): Promise<LoginAttemptResult> => {
    const hashedPassword = sha256(password);

    const user = await _getUserByUsername(username);

    if (user && user.password == hashedPassword) {
        const loginKey = await addLoginKey(user.id);

        const result: LoginAttemptResult = {
            user,
            loginKey,
            success: true,
            message: "Successfully logged in"
        };
        return result;
    } else {
        console.log()

        const result: LoginAttemptResult = {
            user,
            loginKey: '',
            success: false,
            message: "Incorrect password"
        };
        return result;
    }
}

export const getLoginKey = async (loginKey: string): Promise<LoginKey> => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM login_keys WHERE login_key=?;`, [loginKey], (err: any, result: LoginKey[]) => {
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
            success: true,
            message: "Token valid!"
        };

        return result;
    } catch {
        const result: LoginAttemptResult = {
            loginKey: loginKey,
            success: false,
            message: "Token invalid."
        };
        return result;
    }
}

export const userExists = async (username: string): Promise<boolean> => {
    try {
        const result = await getUserByUsername(username);

        result.id;

        return true;
    } catch {
        return false;
    }
}

export const signUp = async (username: string, password: string, time_created: number, balance: number, role: UserType, allowance: number, nickname: string, household: string): Promise<SignupAttemptResult> => {
    return new Promise(async (resolve, reject) => {
        try {
            if ((await userExists(username)))
            {
                const result: SignupAttemptResult = {
                    success: false,
                    error: "Username is already in use!",
                };

                resolve(result);
            }

            if (role == UserType.Parent)
            {
                const house = await createHousehold(household, getUnixTime());

                household = house.code;
            }

            connection.query(`INSERT INTO users (username, password, time_created, balance, role, allowance, household, nickname) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [username, sha256(password), time_created, balance, role, allowance, household, nickname], async (err: any) => {
                const user = await getUserByUsername(username);

                const result: SignupAttemptResult = {
                    success: true,
                    user: user,
                };

                resolve(result);
            });
        } catch {
            const result: SignupAttemptResult = {
                success: false,
                error: "Server error processing sign-up.",
            };

            resolve(result);
        }
    })
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
                    (user.role == UserType.Parent && user.id == recordUser.id) ||
                    (user.role == UserType.Child && user.id == recordUser.id)
                );
            default:
                return false;
        }
    } catch {
        return false;
    }
}