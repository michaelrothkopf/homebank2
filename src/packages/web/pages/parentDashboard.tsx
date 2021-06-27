import React from 'react';

import { ParentNavUI } from "../components/navui"
import { Card, DashboardContainer, HouseholdCompletedChores } from "../components/dashboardColumns"
import LoginErrorModal from '../components/loginErrorModal';

export default function ParentDashboard()
{
    return (
        <div className="appContainer">
            <LoginErrorModal role="parent" />
            <ParentNavUI activePage="Dashboard" />
            <div className="container">
                <DashboardContainer>
                    <HouseholdCompletedChores />
                </DashboardContainer>
            </div>
        </div>
    );
}