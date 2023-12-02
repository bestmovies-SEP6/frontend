import "./login.css";
import {useState, useRef, useEffect} from "react";

import {useDispatch} from "react-redux";
import {setCredentials} from "../../../redux/features/state/authState";
import {useLoginMutation} from "../../../redux/features/api/authApi";
import {useNavigate} from "react-router-dom";
import LoadingComponent from "../../components/loading/loadingComponent";
import {Error} from "@mui/icons-material";
import ErrorComponent from "../../components/error/errorComponent";

function LoginComponent() {

    const usernameRef = useRef();
    const errorRef = useRef();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [login, {isLoading, error}] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {

        // This focuses the username input field when the page loads
        usernameRef.current.focus();
    }, []);

    useEffect(() => {

        // This resets the error message when the username or password changes
        setErrorMessage("");
    }, [username, password])


    if (isLoading) return <LoadingComponent/>
    if (error) return <ErrorComponent error={error}/>

    async function onLoginClicked() {
        try {
            console.log("Login clicked")
            if (username === "" || password === "") {
                setErrorMessage("Please fill in all the fields");
                return;
            }
            console.log("Username: ", username)
            console.log("Password: ", password)
            const data = await login({username, password}).unwrap();
            const jwtToken = data.jwt_token;
            console.log("Token: ", jwtToken)
            dispatch(setCredentials({jwtToken, username}));
            setUsername("");
            setPassword("");
            navigate("/");
        } catch (e) {
            setErrorMessage(e.data.message);
        }

    }


    return (<div className={"login-container"}>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} ref={usernameRef}
                   onChange={e => setUsername(e.target.value)} required/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password}
                   onChange={e => setPassword(e.target.value)} required/>
            <button className="login_button" onClick={onLoginClicked}>Login</button>
        </div>
    );
}

export default LoginComponent;