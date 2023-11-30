import React from "react";
import NavBar from "../components/NavBar";
import {Outlet} from "react-router-dom";

function Root() {

    return(
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );

}


export {Root}