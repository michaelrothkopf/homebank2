import React from 'react';

import { ParentNavUI } from "../components/navui"

export default function ChildDashboard()
{
    return (
        <div className="appContainer">
            <ParentNavUI activePage="Dashboard" />
            <h1>Hello from Homebank 2.0!</h1>
        </div>
    );
}