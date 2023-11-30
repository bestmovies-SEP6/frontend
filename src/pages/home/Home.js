import React, {useState, useEffect, Component} from "react";

import {useMoviesInformationContext} from "../../contexts/MoviesInformationContext";
import MovieCard from "../../components/MovieCard";
import "../../css/Home.css"
import MovieCarousel from "../../components/MovieCarousel";

function Home() {

    const {carouselMovies} = useMoviesInformationContext()
    return (
        <>
            <MovieCarousel />
            <MovieCardList />
        </>
       );
}
function MovieCardList(){
    const {isLoading, isError, data} = useMoviesInformationContext();
    /*  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e8ebe675";*/
    // Check if the data is available and has a 'Search' property
    const movies = data;
   return  <div>
        {isLoading && <p>Loading....</p>}
        {isError && <p>Error Fetching Movies</p>}

        {!isLoading && !isError && movies?.length > 0 ? (
            <div className="container">
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        ) : !isLoading && !isError && (
            <p>No Movies</p>
        )}
    </div>

}

export {Home};
