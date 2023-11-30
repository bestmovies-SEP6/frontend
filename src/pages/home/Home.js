import React, {useState, useEffect, Component} from "react";

import MovieCard from "../../components/MovieCard";
import "../../css/Home.css"
import MovieCarousel from "../../components/MovieCarousel";
import {fetchAndCombineUniqueMovies} from "../../api/apiinfo";

function Home() {
    return (
        <>
            <MovieCarousel />
            <MovieCardList />
        </>
       );
}
function MovieCardList(){
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchAndCombineUniqueMovies().then(setMovies);
    }, []);
   return  <div>
        { movies?.length > 0 ? (
            <div className="container">
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        ) :  (
            <p>No Movies</p>
        )}
    </div>

}

export {Home};
