import React, {useEffect, useState} from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import "./authPage.css";
import {useLoginMutation, useRegisterMutation} from "../../../redux/features/api/authApi";
import LoadingComponent from "../../components/loading/loadingComponent";
import ErrorComponent from "../../components/error/errorComponent";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../../redux/features/state/authState";
import {useNavigate} from "react-router-dom";
import {validateCredentials, validateEmail} from "../../../utils/validator";

function AuthenticationPage() {
    const [isActive, setIsActive] = useState(false);

    function handleRegisterClick() {
        setIsActive(true);
    }

    function handleLoginClick() {
        setIsActive(false)
    }

    return (
        <div className={"outer-container"}>
            <div className={`container ${isActive ? "active" : ""}`}>

                <div className="form-container sign-up">
                    <SignUpContainer/>
                </div>

                <div className="form-container sign-in">
                    <SignInContainer/>
                </div>


                {/*container that shifts between left and right*/}
                <div className="toggle-container">
                    <div className="toggle">

                        {/* Left panel for sign-in */}
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use Best Movies!!</p>
                            <button className="container-button hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>

                        {/* Right panel for sign-up */}
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Welcome to Best Movies!</h1>
                            <p>Register with your personal details to use Best Movies!</p>
                            <button className="container-button hidden" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*sign-up container */
function SignUpContainer() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useState("");

    const [register, {isLoading, error}] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // This resets the error message when the user changes the username, password, or email
    useEffect(() => {
        setErrorMessage("");

    }, [username, password, email]);

    if (error) return <ErrorComponent error={error}/>

    async function onSignup() {
        try {
            validateCredentials(username, password);
            validateEmail(email);
            const {data} = await register({username, password, email});
            const jwtToken = data.jwt_token;

            dispatch(setCredentials({jwtToken, username}));
            setUsername("");
            setPassword("");
            setEmail("");
            navigate("/")
        } catch (e) {
            setErrorMessage(e.message);
        }

    }

    return (
        <>
            <div className="form-element">
                {isLoading && <LoadingComponent/>}
                <h1>Create Account</h1>
                <span>Fill in the details for Registration</span>
                <input type={"text"} placeholder={"Username"} value={username}
                       onChange={(e) => setUsername(e.target.value)}/>

                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input type="email" placeholder="Email" value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <button className="container-button" onClick={onSignup}>Sign Up</button>
            </div>
        </>
    )
}

/*sign in container*/
function SignInContainer() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [errorMessage, setErrorMessage] = useState("");

    const [login, {isLoading, error}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isLoading) return <LoadingComponent/>
    if (error) return <ErrorComponent error={error}/>

    async function onSignIn() {
        try {
            validateCredentials(username, password);
            const {data} = await login({username, password});
            const jwtToken = data.jwt_token;

            console.log("data  ", data)

            dispatch(setCredentials({jwtToken, username}));
            setUsername("");
            setPassword("");
            navigate("/")
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return (
        <>
            <div className="form-element">
                <h1>Sign In</h1>
                <span>Use your username and password</span>
                <input type="text" placeholder="Username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>

                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Forget Your Password?</a>
                <button className="container-button" onClick={onSignIn}>Sign In</button>
            </div>
        </>
    )
}


function PasswordInput({value, onChange}) {
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(<VisibilityOffOutlinedIcon/>);
    const handleToggle = () => {
        if (type === "password") {
            setIcon(<VisibilityOutlinedIcon/>);
            setType("text");
        } else {
            setIcon(<VisibilityOffOutlinedIcon/>);
            setType("password");
        }
    };

    return (
        <>
            <input type={type} placeholder="Password" value={value}
                   onChange={onChange}/>
            <span onClick={handleToggle} className="toggle-eye-icon"> {icon} </span>
        </>
    )
}


export default AuthenticationPage;