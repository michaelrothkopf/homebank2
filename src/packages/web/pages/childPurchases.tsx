import { ChildNavUI } from "../components/navui"
import LoginErrorModal from "../components/loginErrorModal"
import { ChildLogPurchaseColumn, ChildPurchasesColumn, DashboardContainer } from "../components/dashboardColumns";

export default function ChildPurchases()
{
    return (
        <div className="appContainer">
            <LoginErrorModal role="child" />
            <ChildNavUI activePage="Purchases" />
            <br />
            <DashboardContainer>
                <ChildLogPurchaseColumn />
                <ChildPurchasesColumn />
            </DashboardContainer>
        </div>
    );
}