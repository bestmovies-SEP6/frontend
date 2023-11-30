import React, { createContext, useContext,useEffect } from "react";
import "../css/SearchBar.css";
import { useQuery } from "react-query";
import { useSearchTermContext } from "./SearchTermContext";

const MoviesInformationContext = createContext();

function MoviesProvider({ children }) {
    const API_URL = "https://www.omdbapi.com/?apikey=e8ebe675";
    const { searchTerm } = useSearchTermContext();

    const { isLoading, isError, data } = useQuery(
        ["moviesData", searchTerm],
        () => {
            const query = searchTerm || 'Nepal'; // Use a default term for initial load
            return fetch(`${API_URL}&s=${encodeURIComponent(query)}`).then((res) => res.json());
        },
        {
            staleTime: Infinity
        }
    );

    return (
        <MoviesInformationContext.Provider value={{ isLoading, isError, data }}>
            {children}
        </MoviesInformationContext.Provider>
    );
}

function useMoviesInformationContext() {
    return useContext(MoviesInformationContext);
}

export { MoviesProvider, useMoviesInformationContext };
