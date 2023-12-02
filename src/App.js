import React from 'react';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginComponent from "./ui/pages/auth/login";
import {HomePage} from "./ui/pages/home/HomePage";
import {Root} from "./ui/pages/Root";
import MovieDetailsPage from "./ui/pages/movieDetails/MovieDetailsPage";
import RegisterComponent from "./ui/pages/auth/register";

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
              path: "/register",
              element: <RegisterComponent/>
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
                    <RouterProvider router={router} />
        </QueryClientProvider>
    </div>
  );
}

export default App;