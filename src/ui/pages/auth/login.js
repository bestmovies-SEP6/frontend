import "./login.css";
import {useState} from "react";
import {login} from "../../../api/authenticationApi";

function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function onLoginClicked() {
        if (username === "" || password === "") {
            alert("Please fill in all the fields");
            return;
        }
        console.log("Login clicked");
        await login(username, password);

    }


    return (<div className={"login-container"}>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <button className="login_button" onClick={onLoginClicked}>Login</button>
        </div>
    );
}

export default LoginComponent;