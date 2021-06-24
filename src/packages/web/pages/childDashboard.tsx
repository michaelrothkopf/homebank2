import React from 'react';

import { ParentNavUI } from "../components/navui"
import { Card } from "../components/dashboardColumns"

export default function ChildDashboard()
{
    return (
        <div className="appContainer">
            <ParentNavUI activePage="Dashboard" />
            <h1>Hello from Homebank 2.0!</h1>
            <div className="container">
            <Card cardTitle="Chore" cardContent={"Michael completed \"Taking out the trash\""} cardTime={Date.now() / 1000} deleteHandler={(e: any) => {e.preventDefault(); console.log("Hello! I have been pressed.")}} />
            </div>
        </div>
    );
}