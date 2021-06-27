import { useState } from "react";
import fetchData from "../components/fetchData";

export default function Login()
{
    const [usernameFieldValue, setUsernameFieldValue] = useState<string>("");
    const [passwordFieldValue, setPasswordFieldValue] = useState<string>("");

    const submitHandler = (e: any) => {
        fetchData("/api/v2/login", { username: usernameFieldValue, password: passwordFieldValue }).then((response) => {
            if (!response.failed)
                window.location.href = (response.data.accountType === "child" ? "/childDashboard" : "/parentDashboard");
        });
    }

    const usernameChangeEvent = (e: any) => {
        setUsernameFieldValue(e.target.value);
    }

    const passwordChangeEvent = (e: any) => {
        setPasswordFieldValue(e.target.value);
    }

    return (
        <div className="appContainer">
            <div className="container">
                <div className="columns is-vcentered is-centered">
                    <div className="block">
                        <div className="column is-half">
                            <h1 className="title">
                                Log in
                            </h1>
                            <h2 className="subtitle">
                                Log in to Homebank.
                            </h2>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left">
                            <input type="text" className="input" placeholder="Username" onChange={usernameChangeEvent} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                            <input type="password" className="input" placeholder="Password" onChange={passwordChangeEvent} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-key"></i>
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button className="button is-link" onSubmit={submitHandler}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}