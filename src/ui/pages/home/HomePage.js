import React from "react";

import MovieCard from "../../components/movieCard/MovieCard";
import "./HomePage.css"
import MovieCarousel from "../../components/movieCarousel/MovieCarousel";
import {useNavigate} from "react-router-dom";
import {
    usePopularMoviesQuery,
    useTopRatedMoviesQuery,
    useTrendingMoviesQuery
} from "../../../redux/features/api/moviesApi";
import {toast} from "react-toastify";
import LoadingComponent from "../../components/loading/loadingComponent";
import {useGetWishlistsQuery} from "../../../redux/features/api/wishlistApi";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../../redux/features/state/authState";
import FlatMoviesList from "../../components/flatMovieCard/FlatMovieCard";


function HomePage() {
    return (
        <>
            <div className={"carousel-container"}>
                <MovieCarousel/>
            </div>
            <div className={"container-wrapper"}>
                <div className={"movies-container"}>
                    <MovieCardList/>
                </div>
                <div className={"wishlists-section"}>
                    <div className={"hard-title"}>
                        Wishlists
                    </div>
                    <WishListsContainer/>
                </div>
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


    if (isLoading) {
        return <LoadingComponent/>
    }


    if (error) {
        toast.update("loadingHomePage", {
            render: error.data,
            type: "error",
            autoClose: false,
        })
        return <div></div>
    }

    const data = getUniqueMovies(trending.data, popular.data, topRated.data);


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

function WishListsContainer() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {data: wishLists, error} = useGetWishlistsQuery();

    const navigate = useNavigate();
    if (!isLoggedIn) {
        return <div className={"login-required"} onClick={() => navigate("/authenticate")}>
            Login to see your wishlists
        </div>
    }

    if (!wishLists) {
        return <LoadingComponent/>
    }
    if (error) {
        toast.error(error.data, {
            autoClose: false,
        });
    }
    return <div className={"wishlists-container"}>
        <FlatMoviesList movies={wishLists}/>
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
