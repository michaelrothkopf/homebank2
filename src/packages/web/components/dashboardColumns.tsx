import React, { useEffect, useState } from "react"
import { CompletedChore } from "../../server/db/completedChore"
import fetchData from "./fetchData";

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
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {props.cardTitle}
                </p>
            </header>
            <div className="card-content">
                <div className="content">
                    <span>{props.cardContent}</span>
                    <UnixTime time={props.cardTime} />
                </div>
            </div>
            <footer className="card-footer">
                <a onClick={props.deleteHandler} className="card-footer-item">Delete</a>
            </footer>
        </div>
    );
}

interface DashboardContainerProps
{
    children: any,
}

export function HouseholdCompletedChores()
{
    const [completedChores, setCompletedChores] = useState<CompletedChore[]>([]);

    useEffect(() => {
        fetchData("/api/v2/getHouseholdChoresCompleted").then(async (result: CompletedChore[]) => {
            const newResult = [];
            
            const householdUsers = (await fetchData("/api/v2/getHouseholdUsers")).data;

            for (const chore of result)
            {
                chore.choreName = (await fetchData("/api/v2/getChore", { choreId: chore.id })).data.name;
                
                for (const user of householdUsers)
                {
                    if (user.id == chore.user)
                    {
                        chore.completedUserNickname = user.nickname;
                    }
                }

                newResult.push(chore);
            }

            setCompletedChores(newResult);
        });
    });

    return (
        <div className="column">
            {completedChores.map((choreCompleted) => {
                <Card cardTitle={`Chore`} cardTime={choreCompleted.time_completed} cardContent={`${choreCompleted.completedUserNickname} completed the "${choreCompleted.choreName}" chore.`} deleteHandler={(e:any)=>{}} />
            })}
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