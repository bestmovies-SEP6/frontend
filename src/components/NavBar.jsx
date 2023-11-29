import React from 'react';
import SearchBar from '../components/SearchBar'; // Assuming you have a SearchBar component
import logo from  '../images/logo.png';
import '../css/NavBar.css';

function Navbar()  {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                {/* <img src={logo} alt="Logo" /> */}
                <h1>BestMOVIES</h1>
            </div>
            <div className="navbar-search">
                <SearchBar />
            </div>
            <div className="navbar-signin">
                <button>Sign In</button>
            </div>
        </nav>
    );
};

export default Navbar;
