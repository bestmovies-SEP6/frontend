import React from 'react';
import {RouterProvider, createHashRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {HomePage} from "./ui/pages/home/HomePage";
import {Root} from "./ui/pages/Root";

import AuthenticationPage from "./ui/pages/auth/authPage";
import MovieDetailsPage from "./ui/pages/movieDetails/MovieDetailsPage";
import {People} from "./ui/pages/people/People";

const queryClient = new QueryClient();

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
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </div>
    );
}

export default App;