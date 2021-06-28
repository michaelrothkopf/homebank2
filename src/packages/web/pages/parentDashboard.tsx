import { ParentNavUI } from "../components/navui"
import LoginErrorModal from '../components/loginErrorModal'

import { Card, DashboardContainer, HouseholdCompletedChoresColumn, HouseholdPurchasesColumn, HouseholdUsersColumn } from "../components/dashboardColumns"

export default function ParentDashboard()
{
    return (
        <div className="appContainer">
            <LoginErrorModal role="parent" />
            <ParentNavUI activePage="Dashboard" />
            <br />
            <DashboardContainer>
                <HouseholdCompletedChoresColumn />
                <HouseholdUsersColumn />
                <HouseholdPurchasesColumn />
            </DashboardContainer>
        </div>
    );
}