import React, { useState } from 'react';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
// import SearchBar from './components/SearchBar';
import LoginComponent from "./pages/auth/login";
import {Home} from "./pages/home/Home";
import {Root} from "./pages/Root";
import {MoviesProvider} from "./contexts/MoviesInformationContext";
import {SearchTermProvider} from "./contexts/SearchTermContext";


const queryClient = new QueryClient();

  const router = createHashRouter([
    {
      path: "/",
      element: <Root />,
      children: [
          {
              path: "/",
              element: <Home />
          },
          {
              path:"/login",
              element: <LoginComponent/>
          }
      ],
    },
  ]);


 export function App() {

  return (

    <div className="App">
        <QueryClientProvider client={queryClient}>

            <SearchTermProvider>
                <MoviesProvider>
                    <RouterProvider router={router} />
                </MoviesProvider>
            </SearchTermProvider>
        </QueryClientProvider>
    </div>
  );
}

export default App;