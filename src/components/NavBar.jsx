import React from 'react';
import logo from  '../images/logo.png';
import '../css/NavBar.css';
import "../css/SearchBar.css"
import {NavLink} from "react-router-dom";
import SearchBarComponent from "./SearchBarComponent";

function Navbar()  {
    return (
        <nav className="navbar">
            <NavLink to={"/"} className="navbar-logo">
                 <img src={logo} alt="Logo"/>
            </NavLink>
            <div className="navbar-search">
                <SearchBarComponent />
            </div>
            <NavLink  to={"/login"} className="navbar-signin">
                <button>Sign In</button>
            </NavLink>
        </nav>
    );
};

export default Navbar;
