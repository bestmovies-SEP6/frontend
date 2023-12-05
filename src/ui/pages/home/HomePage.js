import React from "react";

import MovieCard from "../../components/movieCard/MovieCard";
import "./HomePage.css"
import MovieCarousel from "../../components/movieCarousel/MovieCarousel";
import LoadingComponent from "../../components/loading/loadingComponent";
import ErrorComponent from "../../components/error/errorComponent";
import {useNavigate} from "react-router-dom";
import {
    usePopularMoviesQuery,
    useTopRatedMoviesQuery,
    useTrendingMoviesQuery
} from "../../../redux/features/api/moviesApi";
import {toast} from "react-toastify";


function HomePage() {
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


    const trending = useTrendingMoviesQuery();
    const popular = usePopularMoviesQuery();
    const topRated = useTopRatedMoviesQuery();

    const isLoading = trending.isLoading || popular.isLoading || topRated.isLoading;
    const error = trending.error || popular.error || topRated.error;


    if (isLoading) return <LoadingComponent/>;
    if (error) return <ErrorComponent error={error}/>;

    const data = getUniqueMovies(trending.data, popular.data, topRated.data);


    function onClickMovieCard(movieId) {
        // navigate(`/movie/${movieId}`);
        toast("This feature is not implemented yet")
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


function getUniqueMovies(trending, popular, topRated) {
    const allMovies = [...trending, ...popular, ...topRated];
    // Remove duplicates
    const uniqueMoviesMap = new Map();
    allMovies.forEach(movie => uniqueMoviesMap.set(movie.id, movie));
    return Array.from(uniqueMoviesMap.values());

}

export {HomePage};
