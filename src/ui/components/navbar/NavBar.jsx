import React from 'react';
import logo from '../../../images/logo.png';
import './NavBar.css';
import "../search/SearchBar.css"
import {NavLink, useNavigate} from "react-router-dom";
import SearchBarComponent from "../search/SearchBarComponent";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {logOut, selectIsLoggedIn} from "../../../redux/features/state/authState";
import {useDispatch, useSelector} from "react-redux";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to={"/"} className="navbar-logo">
                {/*<img src={logo} alt="Logo"/>*/}
            </NavLink>
            <div className="navbar-search">
                <SearchBarComponent/>
            </div>
            <NavLink  to={"/people/1"} className="navbar-person">
                <button>Person</button>
            </NavLink>
            <NavLink  to={"/authenticate"} className="navbar-signin">
                <button>Sign In</button>
            </NavLink>
            <SignInOutButton/>
        </nav>
    );
};

function SignInOutButton() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSignOutClick() {
        dispatch(logOut());
    }
    function onSignInClick() {
        navigate("/authenticate")
    }

    if (isLoggedIn) {
        return <>
            <button className={"sign-in-out"} onClick={onSignOutClick}>
                <LogoutIcon/>
                Sign Out
            </button>

        </>
    }
    return <>
        <button onClick={onSignInClick} className={"sign-in-out"}>
            <LoginIcon/>
            Sign In
        </button>
    </>

}

export default Navbar;
