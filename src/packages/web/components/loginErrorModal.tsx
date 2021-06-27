import React, { useEffect, useState } from "react"
import fetchData from "./fetchData"

export default function LoginErrorModal(props: { role: string })
{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
                    <h1 className="title is-1" style={{color: 'white'}}>Warning: Access not authorized</h1>
                    It appears you aren&quot;t logged in to homebank, or you&quot;re visiting parent pages on a child account (or vice versa)! This may cause issues or errors loading data, and you won&apos;t be able to use homebank as intended. Click the button below to log in:
                    <a href="/" className="button">Log In</a>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => {setIsLoggedIn(true);}}></button>
            </div>
            :
            <></>}
        </>
    );
}