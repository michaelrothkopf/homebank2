import { useEffect } from "react";
import fetchData from "../components/fetchData";

export default function Logout()
{
    useEffect(() => {
        fetchData("/api/v2/logout", {}).then(() => {
            window.location.href = "/";
        })
    }, []);

    return (
        <div className="appContainer">
            <div className="centerContainer" style={{height: '100vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <h3>Logging out...</h3>
            </div>
        </div>
    );
}