import React, { useEffect, useState } from "react"
import { Chore } from "../../server/db/chore";
import { CompletedChore as _CompletedChore } from "../../server/db/completedChore"
import fetchData from "./fetchData";

export interface CompletedChore extends _CompletedChore
{
    choreName?: string,
    completedUserNickname?: string,
    completedChoreValue?: number,
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
    cardTime: number,
    deleteHandler: (e: any) => void,
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
                        <UnixTime time={props.cardTime} />
                    </div>
                </div>
                <footer className="card-footer">
                    <a onClick={props.deleteHandler} className="card-footer-item">Delete</a>
                </footer>
            </div>
        </div>
    );
}

interface DashboardContainerProps
{
    children: any,
}

export function ChoreCard(props: { chore: CompletedChore })
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

export function HouseholdCompletedChores()
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
                    if (user.id == chore.user)
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
            {completedChores.map((choreCompleted) => 
                <ChoreCard key={choreCompleted.id} chore={choreCompleted} />
            )}
        </div>
    );
}

export function DashboardContainer(props: DashboardContainerProps)
{
    return (
        <div className="columns">
            {props.children}
        </div>
    );
}