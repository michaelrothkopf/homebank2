import React, { useEffect, useState } from "react"
import fetchData from "./fetchData"

export default function LoginErrorModal(props: { role: string })
{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [accountRole, setAccountRole] = useState<string>(props.role);

    useEffect(() => {
        fetchData("/api/v2/checkLoginStatus").then((result) => {
            setIsLoggedIn(result.data.loggedIn);
            
            if (result.data.loggedIn)
            {
                setAccountRole(result.data.role);
            }
        });
    }, []);

    return (
        <>
            {(!isLoggedIn || accountRole !== props.role) ?
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-content" style={{color: 'white'}}>
                    <h1 className="title is-1" style={{color: 'white'}}>Access denied</h1>
                    <div className="content">
                        <p>This error is caused by 2 things:</p>
                        <ol>
                            <li>You aren&quot;t logged in.</li>
                            <li>You are logged into an account that can&quot;t access this page.</li>
                        </ol>
                        <p>Click this button to log in to an account that can access this page.</p>
                    </div>
                    <a href="/login" className="button is-link">Log In</a>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => {setIsLoggedIn(true);}}></button>
            </div>
            :
            <></>}
        </>
    );
}