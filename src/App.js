import React from 'react';
import {RouterProvider, createHashRouter} from "react-router-dom";
import {HomePage} from "./ui/pages/home/HomePage";
import {Root} from "./ui/pages/Root";

import AuthenticationPage from "./ui/pages/auth/authPage";
import MovieDetailsPage from "./ui/pages/movieDetails/MovieDetailsPage";
import {People} from "./ui/pages/people/People";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PersonDetailsPage from "./ui/pages/people/PersonDetailspage";


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
                path: "/people/:pageNo", // People page with dynamic segment for the page number
                element: <People/>
            },
            {
                path: "/person-details/:personId", // People page with dynamic segment for the page number
                element: <PersonDetailsPage/>
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