import "./MovieCardComponent.css"
import {useNavigate} from "react-router-dom";
import MovieCard from "../movieCard/MovieCard";
import React from "react";

function MovieCardListComponent({movies}) {
    const navigate = useNavigate();
   movies = movies.slice(0,49);

    function onClickMovieCard(movieId) {
        navigate(`/movie/${movieId}`);
    }

    return <div>
        <div className="movie-container">
            {movies.length === 0 ? <p>No movies found</p> : (
                movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} onClick={() => onClickMovieCard(movie.id)}/>
                ))
            )
            }
        </div>
    </div>
}

export default MovieCardListComponent;