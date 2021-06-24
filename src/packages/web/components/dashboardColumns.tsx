import React from 'react'

function GetTimeStringFromUnix(time: number): string
{
    const date = new Date(time * 1000);
    const localeString = date.toLocaleString('default');
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
                    {props.cardContent}
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
    return (
        <div className="column">

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