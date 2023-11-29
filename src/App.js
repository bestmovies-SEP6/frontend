import './css/App.css';
import React, { useState } from 'react';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Root } from './routes/Root';
import Home from './pages/home/Home';
import SearchBar from './components/SearchBar';


const queryClient = new QueryClient();

  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        // Aru routes
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