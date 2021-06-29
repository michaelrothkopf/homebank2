import React, { useEffect, useState } from "react"
import { Chore } from "../../server/db/chore";
import { CompletedChore as _CompletedChore } from "../../server/db/completedChore"
import { Purchase as _Purchase } from "../../server/db/purchase";
import { User as _User } from "../../server/db/user";
import fetchData from "./fetchData";

export interface CompletedChore extends _CompletedChore
{
    choreName?: string,
    completedUserNickname?: string,
    completedChoreValue?: number,
}

export interface User extends _User
{
}

export interface Purchase extends _Purchase
{
    completedUserNickname?: string
}

function GetTimeStringFromUnix(time: number): string
{
    const date = new Date(time * 1000);
    const localeString = date.toLocaleString("default");
    return localeString;
}

export function UnixTime(props: {time: number})
{
    return (
        <time>{GetTimeStringFromUnix(props.time)}</time>
    );
}

export interface CardProps
{
    cardTitle: string,
    cardContent: string,
    noTime?: boolean,
    cardTime?: number,
    deleteHandler?: (e: any) => void,
    noFooter?: boolean,
}

export function Card(props: CardProps)
{
    return (
        <div className="block">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {props.cardTitle}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>{props.cardContent}</p>
                        {(!props.noTime) ?
                        <UnixTime time={props.cardTime} />
                        :
                        <></>}
                    </div>
                </div>
                {(!props.noFooter) ?
                <footer className="card-footer">
                    <a onClick={props.deleteHandler} className="card-footer-item">Delete</a>
                </footer>
                :
                <></>}
            </div>
        </div>
    );
}

interface DashboardContainerProps
{
    children: any,
}

export function CompletedChoreCard(props: { chore: CompletedChore })
{
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const deleteChoreHandler = (e: any) => {
        fetchData("/api/v2/removeCompletedChore", { completedChoreId: props.chore.id }).then((response: any) => {
            if (response.data === true)
            {
                setIsDeleted(true);
            }
        });
    }

    return (
        <>
            {(!isDeleted) ?
                <Card cardTitle={`Chore`} cardTime={props.chore.time_completed} cardContent={`${props.chore.completedUserNickname} completed the "${props.chore.choreName}" chore for $${props.chore.completedChoreValue}.`} deleteHandler={deleteChoreHandler} />
            :
            <></>}
        </>
    );
}

export function PurchaseCard(props: { purchase: Purchase })
{
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const deletePurchaseHandler = (e: any) => {
        fetchData("/api/v2/removeUserPurchase", { purchaseId: props.purchase.id }).then((response: any) => {
            if (response.data === true)
            {
                setIsDeleted(true);
            }
        });
    }

    return (
        <>
            {(!isDeleted) ?
                <Card cardTitle={`Purchase`} cardTime={props.purchase.time_added} cardContent={`${props.purchase.completedUserNickname} purchased "${props.purchase.item}" for $${(props.purchase.amount).toLocaleString('default', { minimumFractionDigits: 2 })}.`} deleteHandler={deletePurchaseHandler} />
            :
            <></>}
        </>
    );
}

export function HouseholdUserCard(props: { user: User })
{
    return (
        <Card cardTitle={props.user.nickname} cardContent={`Balance: $${(props.user.totalBalance).toLocaleString('default', { minimumFractionDigits: 2 })}`} noTime={true} noFooter={true} />
    );
}

export function HouseholdChoreCard(props: { chore: Chore })
{
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const deleteChoreHandler = (e: any) => {
        fetchData("/api/v2/removeHouseholdChore", { choreId: props.chore.id }).then((response: any) => {
            if (response.data === true)
            {
                setIsDeleted(true);
            }
        });
    }

    return (
        <>
            {(!isDeleted) ?
                <Card cardTitle={props.chore.name} cardContent={`Value: $${(props.chore.value).toLocaleString('default', { minimumFractionDigits: 2 })}`} noTime={true} deleteHandler={deleteChoreHandler} />
            :
            <></>}
        </>
    );
}

export function HouseholdSettingsCard(props: { user: User, settingsUpdateHandler: () => void })
{
    const [allowanceValue, setAllowanceValue] = useState<number>(0);
    const [startingBalance, setStartingBalance] = useState<number>(0);

    const allowanceChangeHandler = (e: any) => {
        setAllowanceValue(parseFloat(e.target.value));
    }

    const setAllowanceButtonHandler = (e: any) => {
        fetchData("/api/v2/setUserAllowance", { userId: props.user.id, newAllowance: allowanceValue }).then(() => {
            props.settingsUpdateHandler();
        })
    }

    const startingBalanceChangeHandler = (e: any) => {
        setStartingBalance(parseFloat(e.target.value));
    }

    const setStartingBalanceButtonHandler = (e: any) => {
        fetchData("/api/v2/setUserStartingBalance", { userId: props.user.id, newBalance: startingBalance }).then(() => {
            props.settingsUpdateHandler();
        })
    }

    return (
        <div className="block">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {props.user.nickname}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>{`Allowance: $${(props.user.allowance).toLocaleString('default', { minimumFractionDigits: 2 })}`}</p>
                        <p>{`Starting balance: $${(props.user.balance).toLocaleString('default', { minimumFractionDigits: 2 })}`}</p>
                        <br />
                        <div className="field">
                            <label className="label">New Allowance</label>
                            <div className="control">
                                <input type="number" className="input" placeholder="User's new allowance" onChange={allowanceChangeHandler} />
                                <button className="button is-link" onClick={setAllowanceButtonHandler}>Set</button>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">New Starting Balance</label>
                            <div className="control">
                                <input type="number" className="input" placeholder="User's new starting balance" onChange={startingBalanceChangeHandler} />
                                <button className="button is-link" onClick={setStartingBalanceButtonHandler}>Set</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HouseholdCompletedChoresColumn()
{
    const [completedChores, setCompletedChores] = useState<CompletedChore[]>([]);

    useEffect(() => {
        fetchData("/api/v2/getHouseholdChoresCompleted").then(async (result: { data: CompletedChore[] }) => {
            
            const householdUsers = (await fetchData("/api/v2/getHouseholdUsers")).data;

            for (const chore of result.data)
            {
                const choreInfo: { data: Chore} = (await fetchData("/api/v2/getChore", { choreId: chore.chore }));

                chore.choreName = choreInfo.data.name;
                chore.completedChoreValue = choreInfo.data.value;
                
                for (const user of householdUsers)
                {
                    if (user.id === chore.user)
                    {
                        chore.completedUserNickname = user.nickname;
                    }
                }
            }

            setCompletedChores(result.data);
        });
    }, []);

    return (
        <div className="column">
            {(completedChores.length > 0) ?
            completedChores.map((choreCompleted) => 
            <CompletedChoreCard key={choreCompleted.id} chore={choreCompleted} />
            ) :
            <h1 className="title">Loading...</h1>}
        </div>
    );
}

export function HouseholdUsersColumn()
{
    const [householdUsers, setHouseholdUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchData("/api/v2/getHouseholdUserBalances").then(async (result: { data: User[] }) => {
            setHouseholdUsers(result.data.filter((user) => user.role === "child"));
        });
    }, []);

    return (
        <div className="column">
            {(householdUsers.length > 0) ?
            householdUsers.map((householdUser) => 
            <HouseholdUserCard key={householdUser.id} user={householdUser} />
            ) :
            <h1 className="title">Loading...</h1>}
        </div>
    );
}

export function HouseholdPurchasesColumn()
{
    const [householdPurchases, setHouseholdPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        fetchData("/api/v2/getHouseholdPurchases").then(async (result: { data: Purchase[] }) => {
            const householdUsers: User[] = (await fetchData("/api/v2/getHouseholdUsers")).data;

            for (const purchase of result.data)
            {
                for (const user of householdUsers)
                {
                    if (user.id === purchase.user)
                    {
                        purchase.completedUserNickname = user.nickname
                    }
                }
            }

            setHouseholdPurchases(result.data);
        });
    }, []);

    return (
        <div className="column">
            {(householdPurchases.length > 0) ?
            householdPurchases.map((householdPurchase) => 
            <PurchaseCard key={householdPurchase.id} purchase={householdPurchase} />
            ) :
            <h1 className="title">Loading...</h1>}
        </div>
    );
}

export function HouseholdChoresColumn()
{
    const [householdChores, setHouseholdChores] = useState<Chore[]>([]);

    useEffect(() => {
        fetchData("/api/v2/getHouseholdChores").then(async (result: { data: Chore[] }) => {
            setHouseholdChores(result.data);
        });
    }, []);

    return (
        <div className="column">
            {(householdChores.length > 0) ?
            householdChores.map((householdChore) => 
            <HouseholdChoreCard key={householdChore.id} chore={householdChore} />
            ) :
            <h1 className="title">Loading...</h1>}
        </div>
    );
}

export function AddHouseholdChoreColumn()
{
    const [choreNameValue, setChoreNameValue] = useState<string>("");
    const [chorePriceValue, setChorePriceValue] = useState<number>();

    const choreNameChangeHandler = (e: any) => {
        setChoreNameValue(e.target.value);
    }

    const chorePriceChangeHandler = (e: any) => {
        setChorePriceValue(e.target.value);
    }

    const submitHandler = (e: any) => {
        fetchData("/api/v2/addHouseholdChore", { name: choreNameValue, value: chorePriceValue }).then(() => {
            setChoreNameValue("");
            setChorePriceValue(0);
        });
    }

    return (
        <div className="column">
            <h3>Add Chore</h3>

            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input type="text" className="input" placeholder="Chore name" onChange={choreNameChangeHandler} />
                </div>
            </div>

            <div className="field">
                <label className="label">Value</label>
                <div className="control">
                    <input type="number" className="input" placeholder="Chore value" onChange={chorePriceChangeHandler} />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button className="button is-link" onClick={submitHandler}>Add</button>
                </div>
            </div>
        </div>
    );
}

export function HouseholdSettingsColumn()
{
    const [householdUsers, setHouseholdUsers] = useState<User[]>([]);

    const updateSettings = () => {
        fetchData("/api/v2/getHouseholdUsers").then((result: { data: User[] }) => {
            setHouseholdUsers(result.data.filter((user) => user.role === "child"));
        });
    }

    useEffect(updateSettings, []);

    return (
        <div className="column">
            {(householdUsers.length > 0) ?
            householdUsers.map((user) =>
            <HouseholdSettingsCard key={user.id} user={user} settingsUpdateHandler={updateSettings} />) :
            <h1 className="title">Loading...</h1>}
        </div>
    );
}

export function DashboardContainer(props: DashboardContainerProps)
{
    return (
        <div className="container">
            <div className="columns">
                {props.children}
            </div>
        </div>
    );
}