import { ParentNavUI } from "../components/navui"
import LoginErrorModal from "../components/loginErrorModal"
import { DashboardContainer, HouseholdPurchasesColumn } from "../components/dashboardColumns";

export default function ParentPurchases()
{
    return (
        <div className="appContainer">
            <LoginErrorModal role="parent" />
            <ParentNavUI activePage="Purchases" />
            <br />
            <DashboardContainer>
                <HouseholdPurchasesColumn />
            </DashboardContainer>
        </div>
    );
}