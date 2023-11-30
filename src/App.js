import React, { useState } from 'react';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {Home} from './pages/home/Home';
import {Root} from "./pages/Root";


const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                element: <Home />
            },
        ],
    },
]);


export function App() {

    return (

        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;