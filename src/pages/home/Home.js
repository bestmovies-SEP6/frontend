import React, {useState, useEffect, Component} from "react";

import {MovieCard , MovieCardList} from "../../components/MovieCard";
import "../../css/Home.css"
import MovieCarousel from "../../components/MovieCarousel";
import {fetchAndCombineUniqueMovies, getStoredMovies} from "../../api/apiinfo";

function Home() {
    const [movies, setMovies] = useState(getStoredMovies() || []);

    useEffect(() => {
        if (!movies.length) {
            fetchAndCombineUniqueMovies().then(setMovies);
        }
    }, [movies]);
    return (
        <>
            <MovieCarousel />
            <MovieCardList movies={movies} />
        </>
       );
}


export {Home};
