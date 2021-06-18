import React from 'react';
import ReactDOM from 'react-dom';

import { ParentNavUI } from "./navui"

function App()
{
    return (
        <div className="appContainer">
            <ParentNavUI activePage="Dashboard" />
            <h1>Hello from Homebank 2.0!</h1>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));