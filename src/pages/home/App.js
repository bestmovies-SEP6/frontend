import './App.css';
import {NavLink, Outlet} from "react-router-dom";

function App() {
    return (
        <div className={"app"}>
            <div className={"nav-container"}>
                <NavLink to={"/login"} className={"nav-element home"}>
                    Login
                </NavLink>

                <NavLink to={"/register"} className={"nav-element about-us"}>
                    Signup
                </NavLink>

            </div>
            <Outlet/>
        </div>
    );
}

export default App;
