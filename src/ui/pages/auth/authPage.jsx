import React, {useState} from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import "./authPage.css";
import {useLoginMutation, useRegisterMutation} from "../../../redux/features/api/authApi";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../../redux/features/state/authState";
import {useNavigate} from "react-router-dom";
import {validateCredentials, validateEmail} from "../../../utils/validator";
import {toast} from "react-toastify";

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
                            <h1 className={"title-text"}>Welcome Back!</h1>
                            <p className={"support-text"}>Already have an account ? Enter your personal details to use Best Movies!!</p>
                            <button className="container-button hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>

                        {/* Right panel for sign-up */}
                        <div className="toggle-panel toggle-right">
                            <h1 className={"title-text"}>Hello, Welcome to Best Movies!</h1>
                            <p>Dont have an account yet ? Register with your personal details to use Best Movies!</p>
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
    const [confirmPassword, setConfirmPassword] = useState("");

    const [registerMutation, {isLoading}] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (isLoading) {
        toast.info("Creating Account... This might take a minute if its a first database call..", {
            toastId: "signUpToast",
            pauseOnHover: false,
            autoClose: false
        });
    }

    async function onSignup() {

        if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                toastId: "signUpToast"
            })
            return;
        }

        try {
            validateCredentials(username, password);
            validateEmail(email);
        } catch (e) {
            toast.error(e.message, {
                toastId: "signUpToast"
            })
        }
        const {data, error} = await registerMutation({username, password, email});

        console.log(error)
        if (error) {
            toast.update("signUpToast", {
                render: error.data,
                type: "error",
                pauseOnHover: true
            });
            return;
        }
        const jwtToken = data.jwt_token;
        toast.update("signUpToast", {
            render: "Account Created Successfully, welcome to Best Movies",
            type: "success",
            pauseOnHover: false,
        });
        dispatch(setCredentials({jwtToken, username}));
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/", {replace: true})
    }

    return (
        <>
            <div className="form-element">
                <div>
                    <h1 className={"title-text"}>Create Account</h1>
                    <span>Fill in the details for Registration</span>
                </div>
                <div className={"login-inputs"}>
                    <input type={"text"} placeholder={"Username"} value={username}
                           onChange={(e) => setUsername(e.target.value)}/>

                    <PasswordInput
                        placeHolder={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <PasswordInput
                        placeHolder={"Confirm Password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <input type="email" placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <button className="container-button" onClick={onSignup}>Sign Up</button>
            </div>
        </>
    )
}

/*sign in container*/
function SignInContainer() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isLoading) {
        toast.info("Logging In.. This might take a minute if its a first database call..", {
            toastId: "signInToast",
            pauseOnHover: false,
            autoClose: false
        });
    }

    async function onSignIn() {
        try {
            validateCredentials(username, password);
        } catch (e) {
            toast.error(e.message, {
                toastId: "signInToast",
                pauseOnHover: true
            })
        }
        const {data, error} = await login({username, password});
        if (error) {
            toast.update("signInToast", {
                render: error.data,
                type: "error",
                autoClose: 4000,
                pauseOnHover: true
            });
            return;
        }
        toast.update("signInToast", {
            render: `Welcome back ${username}`,
            type: "success",
            autoClose: 2000,
            pauseOnHover: false,
        });
        const jwtToken = data.jwt_token;
        dispatch(setCredentials({jwtToken, username}));
        setUsername("");
        setPassword("");
        navigate("/", {replace: true})
    }

    return (
        <>
            <div className="form-element">
                <div>
                    <h1 className={"title-text"}>Sign In</h1>
                    <span>Use your username and password</span>
                </div>
                <div className={"login-inputs"}>
                    <input type="text" placeholder="Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>

                    <PasswordInput
                        placeHolder={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <button className="container-button" onClick={onSignIn}>Sign In</button>
            </div>
        </>
    )
}


function PasswordInput({value, onChange, placeHolder}) {
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
            <div className={"password-input"}>
                <input type={type} placeholder={placeHolder} value={value}
                       onChange={onChange}/>
            <span onClick={handleToggle}>
                {icon}
            </span>
            </div>

        </>
    )
}


export default AuthenticationPage;