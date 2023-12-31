import React from 'react';
import './NavBar.css';
import "../search/SearchBar.css"
import {NavLink, useNavigate} from "react-router-dom";
import SearchBarComponent from "../search/SearchBarComponent";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {logOut, selectIsLoggedIn} from "../../../redux/features/state/authState";
import {useDispatch, useSelector} from "react-redux";

function Navbar() {
    const navigate = useNavigate();

    function onPeopleClick() {
        navigate("/people")
    }

    return (
        <nav className="navbar">
            <NavLink to={"/"} className="navbar-logo ">
                <div id={"logo"} className={"hard-title animate-text"}>
                    BestMovies
                </div>
            </NavLink>
            <div className="navbar-search">
                <SearchBarComponent/>
            </div>
            <div className={"buttons-nav"}>
                <button onClick={onPeopleClick} className={"nav-btn"}>
                    <div className={"nav-icon"}>
                        <PersonIcon/>
                    </div>
                    People
                </button>
                <SignInOutButton/>
            </div>

        </nav>
    );
}

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
            <button className={"nav-btn"} onClick={onSignOutClick}>
                <div className={"nav-icon"}>
                    <LogoutIcon/>
                </div>
                Sign Out
            </button>

        </>
    }
    return <>
        <button onClick={onSignInClick} className={"nav-btn"}>
            <div className={"nav-icon"}>
                <LoginIcon/>
            </div>
            Sign In
        </button>
    </>

}

export default Navbar;
