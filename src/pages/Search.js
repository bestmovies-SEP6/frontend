import React, { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import {MovieCard, MovieCardList} from "../components/MovieCard";
import {fetchSearchMoviesBySearchTerm} from "../api/apiinfo";

function Search() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            fetchSearchMoviesBySearchTerm(searchTerm).then(setMovies);
        }
    }, [searchTerm]);

    return (
        <div>
            <MovieCardList movies={movies} />
        </div>
    );
}

export { Search };
