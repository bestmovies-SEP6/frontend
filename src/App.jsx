import React from 'react';
import {RouterProvider, createHashRouter} from "react-router-dom";
import {HomePage} from "./ui/pages/home/HomePage";
import {Root} from "./ui/pages/root/Root";

import AuthenticationPage from "./ui/pages/auth/authPage";
import MovieDetailsPage from "./ui/pages/movieDetails/MovieDetailsPage";
import {People} from "./ui/pages/people/People";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PersonDetailspage from "./ui/pages/people/PersonDetailspage";
import FilterPage from "./ui/pages/filter/FilterPage";


const router = createHashRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "/movie/:id", // Movie details page with dynamic segment for the movie ID
                element: <MovieDetailsPage/>
            },
            {
                path: "/people/",
                element: <People/>
            },
            {
                path: "/person-details/:personId", // People page with dynamic segment for the page number
                element: <PersonDetailspage/>
            },
            {
                path: "/filter",
                element: <FilterPage/>
            }
        ],
    },

    {
        path: "/authenticate",
        element: <AuthenticationPage/>,
    }
]);


export function App() {

    return (

        <div className="App">
            <ToastContainer
                position={"top-right"}
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick rtl={false}
                theme={"dark"}
            />
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;