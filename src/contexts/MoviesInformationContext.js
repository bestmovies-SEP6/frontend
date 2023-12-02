import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { useSearchTermContext } from "./SearchTermContext";
import {fetchTrendingMovies} from "../api/moviesApi";

const MoviesInformationContext = createContext();

function MoviesProvider({ children }) {
    const { searchTerm } = useSearchTermContext();

    const queryKey = ["moviesData", searchTerm];
    const queryFn = searchTerm ? () => fetchTrendingMovies() : fetchTrendingMovies; // Use fetchInitialMovies if searchTerm is empty

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
