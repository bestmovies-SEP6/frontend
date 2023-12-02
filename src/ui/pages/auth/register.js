import "./login.css";
import {useState} from "react";
import {register} from "../../../api/authenticationApi";


function RegisterComponent(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function onSignupClicked() {
        if (username === "" || password === "" || email === "") {
            alert("Please fill in all the fields");
            return;
        }
        console.log("Signup clicked");
        await register(username, email, password);
    }



    return (<div className={"login-container"}>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required/>

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="username" value={email} onChange={e => setEmail(e.target.value)} required/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button onClick={onSignupClicked}>Signup</button>
    </div>);
}

export default RegisterComponent;