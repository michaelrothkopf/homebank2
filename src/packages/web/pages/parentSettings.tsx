import { ParentNavUI } from "../components/navui"
import LoginErrorModal from '../components/loginErrorModal'
import { DashboardContainer, HouseholdSettingsColumn } from "../components/dashboardColumns";

export default function ParentSettings()
{
    return (
        <div className="appContainer">
            <LoginErrorModal role="parent" />
            <ParentNavUI activePage="Settings" />
            <br />
            <DashboardContainer>
                <HouseholdSettingsColumn />
            </DashboardContainer>
        </div>
    );
}