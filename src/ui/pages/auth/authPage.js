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

    const [registerMutation, {isLoading}] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (isLoading) {
        toast.info("Creating Account", {
            toastId: "signUpToast",
            pauseOnHover: false,
            autoClose: 15000
        });
    }

    async function onSignup() {
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

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (isLoading) {
        toast.info("Logging In", {
            toastId: "signInToast",
            pauseOnHover: false,
            autoClose: 15000
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