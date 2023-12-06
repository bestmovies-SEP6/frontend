import React from "react";
import "./HomePage.css"
import MovieCarousel from "../../components/movieCarousel/MovieCarousel";
import {
    usePopularMoviesQuery,
    useTopRatedMoviesQuery,
    useTrendingMoviesQuery
} from "../../../redux/features/api/moviesApi";
import {toast} from "react-toastify";
import LoadingComponent from "../../components/loading/loadingComponent";
import WishListComponent from "../../components/wishlists/WishListComponent";
import MovieCardListComponent from "../../components/movieCardList/MovieCardListComponent";


function HomePage() {

    const trending = useTrendingMoviesQuery();
    const popular = usePopularMoviesQuery();
    const topRated = useTopRatedMoviesQuery();

    const isLoading = trending.isLoading || popular.isLoading || topRated.isLoading;
    const error = trending.error || popular.error || topRated.error;


    if (error) {
        toast.update("loadingHomePage", {
            render: error.data,
            type: "error",
            autoClose: false,
        })
    }

    let data = []
    if (!isLoading){
         data = getUniqueMovies(trending.data, popular.data, topRated.data);
    }


    return (
        <>
            <div className={"carousel-container"}>
                <MovieCarousel/>
            </div>
            <div className={"container-wrapper"}>
                <div className={"movies-container"}>
                    {error ? <p>error</p> : (isLoading ? <LoadingComponent/> : <MovieCardListComponent movies={data}/>)}
                </div>
                <div className={"wishlists-section"}>
                    <div className={"hard-title"}>
                        Wishlists
                    </div>
                    <WishListComponent/>
                </div>
            </div>

        </>
    );
}

function getUniqueMovies(trending, popular, topRated) {
    const allMovies = [...trending, ...popular, ...topRated];
    // Remove duplicates
    const uniqueMoviesMap = new Map();
    allMovies.forEach(movie => uniqueMoviesMap.set(movie.id, movie));
    return Array.from(uniqueMoviesMap.values());
}

export {HomePage};
