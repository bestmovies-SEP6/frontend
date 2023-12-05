import React from "react";
import NavBar from "../../components/navbar/NavBar";
import {Outlet} from "react-router-dom";



function Root() {

    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );

}


export {Root}