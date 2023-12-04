import React from 'react';
import logo from '../../../images/logo.png';
import './NavBar.css';
import "../search/SearchBar.css"
import {NavLink, useNavigate} from "react-router-dom";
import SearchBarComponent from "../search/SearchBarComponent";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {logOut, selectAuth} from "../../../redux/features/state/authState";
import {useDispatch, useSelector} from "react-redux";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to={"/"} className="navbar-logo">
                <img src={logo} alt="Logo"/>
            </NavLink>
            <div className="navbar-search">
                <SearchBarComponent/>
            </div>
            <SignInOutButton/>
        </nav>
    );
};

function SignInOutButton() {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSignOutClick() {
        dispatch(logOut());
    }
    function onSignInClick() {
        navigate("/authenticate")
    }

    if (auth && auth.username && auth.jwtToken) {
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
