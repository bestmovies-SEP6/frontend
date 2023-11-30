import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { useSearchTermContext } from "./SearchTermContext";
import {fetchInitialMovies, fetchMovies} from "../api/apiinfo";

const MoviesInformationContext = createContext();

function MoviesProvider({ children }) {
    const { searchTerm } = useSearchTermContext();

    const queryKey = ["moviesData", searchTerm];
    const queryFn = searchTerm ? () => fetchMovies(searchTerm) : fetchInitialMovies; // Use fetchInitialMovies if searchTerm is empty

    const { isLoading, isError, data } = useQuery(queryKey, queryFn, { staleTime: Infinity });

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
