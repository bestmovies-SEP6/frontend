import React from "react";

import {MovieCard} from "../../components/movieCard/MovieCard";
import "./Home.css"
import MovieCarousel from "../../components/movieCarousel/MovieCarousel";
import {useQuery} from "react-query";
import {fetchAndCombineVariousMovies} from "../../../api/moviesApi";
import LoadingComponent from "../../components/loading/loadingComponent";
import ErrorComponent from "../../components/error/errorComponent";
import {useNavigate} from "react-router-dom";


function HomePage() {
    const movies = {}

    return (
        <>
            <div className={"carousel-container"}>
                <MovieCarousel/>
            </div>
            <div className={"movies-container"}>
                <MovieCardList/>
            </div>
        </>
    );
}

function MovieCardList() {
    const navigate = useNavigate();


    const {data, error, isLoading} = useQuery({
        queryKey: ["moviesHomePage"],
        queryFn: fetchAndCombineVariousMovies,
    })

    if (isLoading) return <LoadingComponent/>;
    if (error) return <ErrorComponent error={error}/>;


    function onClickMovieCard(movieId) {
        navigate(`/movie/${movieId}`);
    }
    return <div>
        {data?.length > 0 ? (
            <div className="movie-container">
                {data.map((movie, index) => (
                    <MovieCard key={index} movie={movie} onClick={() => onClickMovieCard(movie.id)}/>
                ))}
            </div>
        ) : (
            <p>No Movies</p>
        )}
    </div>

}


export {HomePage};
