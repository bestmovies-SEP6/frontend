import React, { useState } from 'react';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginComponent from "./ui/pages/auth/login";
import {HomePage} from "./ui/pages/home/HomePage";
import {Root} from "./ui/pages/Root";
import {SearchTermProvider} from "./contexts/SearchTermContext";
import MovieDetailsPage from "./ui/pages/movieDetails/MovieDetailsPage";
// import Search from "./ui/pages/search/Search";

const queryClient = new QueryClient();

  const router = createHashRouter([
    {
      path: "/",
      element: <Root />,
      children: [
          {
              path: "/",
              element: <HomePage />
          },
          {
              path:"/login",
              element: <LoginComponent/>
          },
          {
              path: "/movie/:id", // Movie details page with dynamic segment for the movie ID
              element: <MovieDetailsPage />
          }
          // {
          //     path: "/filter", // Movie details page with dynamic segment for the movie ID
          //     element: <Search />
          // },
      ],
    },
  ]);


 export function App() {

  return (

    <div className="App">
        <QueryClientProvider client={queryClient}>
            <SearchTermProvider>
                    <RouterProvider router={router} />
            </SearchTermProvider>
        </QueryClientProvider>
    </div>
  );
}

export default App;