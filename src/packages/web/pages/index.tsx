import { useEffect } from "react";
import fetchData from "../components/fetchData";

export default function Logout()
{
    useEffect(() => {
        fetchData("/api/v2/checkLoginStatus").then((result) => {
            if (result.data)
            {
                if (result.data.loggedIn)
                {
                    window.location.href = result.data.role === 'parent' ? '/parentDashboard' : '/childDashboard';
                }
                window.location.href = '/login';
            }
        })
    }, []);

    return (
        <div className="appContainer">
            <div className="centerContainer" style={{height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <h3>Redirecting...</h3>
            </div>
        </div>
    );
}