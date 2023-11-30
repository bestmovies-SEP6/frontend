import React, { useState } from 'react';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginComponent from "./pages/auth/login";
import {Home} from "./pages/home/Home";
import {Root} from "./pages/Root";
import {MoviesProvider} from "./contexts/MoviesInformationContext";
import {SearchTermProvider} from "./contexts/SearchTermContext";
import MovieDetails from "./components/MovieDetails";


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
          },
          {
              path: "/movie/:id", // Movie details page with dynamic segment for the movie ID
              element: <MovieDetails />
          },
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