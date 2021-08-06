import { ChildNavUI } from "../components/navui"
import LoginErrorModal from "../components/loginErrorModal"
import { ChildCompletedChoresColumn, ChildLogChoreColumn, ChildUserColumn, DashboardContainer } from "../components/dashboardColumns"

export default function ChildDashboard()
{
    return (
        <div className="appContainer">
            <LoginErrorModal role="child" />
            <ChildNavUI activePage="Dashboard" />
            <br />
            <DashboardContainer>
                <ChildLogChoreColumn />
                <ChildCompletedChoresColumn />
                <ChildUserColumn />
            </DashboardContainer>
        </div>
    );
}