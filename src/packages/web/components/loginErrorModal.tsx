import React, { useEffect, useState } from "react"
import fetchData from "./fetchData"

export default function LoginErrorModal()
{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        fetchData("/api/v2/checkLoginStatus").then((result) => {
            setIsLoggedIn(result.data);
        });
    });

    return (
        <>
            {!isLoggedIn ?
            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <h1 className="title is-1">Warning: You aren&apos;t logged in!</h1>
                    It appears you aren&apos;t logged in to homebank! This may cause issues or errors loading data, and you won&apos;t be able to use homebank as intended. Click the button below to log in:
                    <a href="/" className="button">Log In</a>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
            :
            <></>}
        </>
    );
}