import { ParentNavUI } from "../components/navui"
import LoginErrorModal from '../components/loginErrorModal'
import { AddHouseholdChoreColumn, DashboardContainer, HouseholdChoresColumn } from "../components/dashboardColumns";

export default function ParentChores()
{
    return (
        <div className="appContainer">
            <LoginErrorModal role="parent" />
            <ParentNavUI activePage="Chores" />
            <br />
            <DashboardContainer>
                <AddHouseholdChoreColumn />
                <HouseholdChoresColumn />
            </DashboardContainer>
        </div>
    );
}