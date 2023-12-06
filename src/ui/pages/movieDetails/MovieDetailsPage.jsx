import React from 'react';
import "./MovieDetailsPage.css";
import {useMovieDetailsByIdQuery, useSimilarMoviesByIdQuery} from "../../../redux/features/api/moviesApi";
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {useNavigate, useParams} from "react-router-dom";
import LoadingComponent from "../../components/loading/loadingComponent";
import {usePersonsByMovieIdQuery} from "../../../redux/features/api/personApi";
import FlatMoviesList from "../../components/flatMovieCard/FlatMovieCard";
import {toast} from "react-toastify";
import {
    useAddToWishlistMutation,
    useGetWishlistsQuery,
    useRemoveFromWishlistMutation
} from "../../../redux/features/api/wishlistApi";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../../redux/features/state/authState";

function MovieDetailsPage() {
    const {id} = useParams();
    const {data: movie, isLoading: isLoadingMovie} = useMovieDetailsByIdQuery(id)
    const {data: persons, isLoading: isLoadingPersons} = usePersonsByMovieIdQuery(id);
    const {data: similarMovies, isLoading: isLoadingSimilarMovies} = useSimilarMoviesByIdQuery(id);

    const isLoading = isLoadingPersons || isLoadingMovie;

    let directors = "";
    let topTen = [];


    if (persons) {
        directors = persons.filter(person => person.known_for_department === "Directing").map(person => person.name).join(", ");
        topTen = persons.slice(0, 10);
    }


    return (
        <div className={"whole-container"}>
            <div className={"navbar-excluded"}>
                <div className={"content-section"}>
                    {!isLoading ? <>
                        <DetailContainer movie={movie} persons={topTen} directors={directors}/>
                        <TopBilledCastsContainer persons={topTen}/>
                    </> : <LoadingComponent/>
                    }
                </div>
                <div className={"similar-section"}>
                    <div className={"hard-title"}>
                        You may like
                    </div>
                    {isLoadingSimilarMovies ? <LoadingComponent/> :
                        <FlatMoviesList movies={similarMovies.slice(0, 10)}/>}
                </div>
            </div>
        </div>

    );
}

function DetailContainer({movie, persons, directors}) {

    const [addToWishListMutation, {isLoading}] = useAddToWishlistMutation()
    const [removeFromWishlist, {isLoading: isLoadingWishlistRemove}] = useRemoveFromWishlistMutation();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {data: wishLists} = useGetWishlistsQuery();

    if (isLoading) {
        toast.info("Adding to wishlist...", {
            toastId: "wishlist",
            autoClose: false,
        });
    }

    if (isLoadingWishlistRemove) {
        toast.info("Removing from wishlist...", {
            toastId: "wishlist",
            autoClose: false,
        });
    }

    let isInWishlist = false;

    if (wishLists) {
        isInWishlist = wishLists.some(movieItem => movieItem.id === movie.id);
    }

    async function onAddWishlistClick() {
        if (!isLoggedIn) {
            toast.error("Login is required to add a wishlist")
            return;
        }

        const {error} = await addToWishListMutation(movie.id)

        if (error) {
            toast.update("wishlist", {
                render: error.data,
                type: toast.TYPE.ERROR,
                autoClose: false,
                closeOnClick: false,
            })
            return;
        }
        toast.update("wishlist", {
            render: "Added to wishlist",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
            closeOnClick: false,
        })
    }

    async function removeFromWishlistClick() {
        if (!isLoggedIn) {
            toast.error("Login is required to remove a wishlist")
            return;
        }

        const {error} = await removeFromWishlist(movie.id)

        if (error) {
            toast.update("wishlist", {
                render: error.data,
                type: toast.TYPE.ERROR,
                autoClose: false,
                closeOnClick: false,
            })
            return;
        }
        toast.update("wishlist", {
            render: "Removed from wishlist",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
            closeOnClick: false,
        })
    }

    function onAddToFavoritesClick(){
        toast.info("This feature is not implemented yet..");
    }

    return <>
        <div className={"movie-details-container"}>
            <div className={"poster-card"}>
                <img className={"poster-card-image"} src={movie.poster_path} alt={movie.name + "'s poster"}
                     loading={"lazy"}/>
            </div>
            <div className={"details"}>
                <div className={"icons-holder"}>
                    <div className={"icon"}>
                        <StarBorderIcon/>
                        {movie.vote_average?.toFixed(2)}
                    </div>
                    <div className={"icon"}>
                        {movie.release_date?.substring(0, 4)}
                    </div>
                    <div className={"icon"}>
                        {movie.runtime} min
                    </div>
                </div>
                <div className={"title"}>
                    {movie.title}
                </div>
                <div className={"overview"}>
                    {movie.overview}
                </div>
                <DetailsMapContainer movie={movie} persons={persons} directors={directors}/>

                <div className={"buttons"}>
                    <button onClick={onAddToFavoritesClick} className={"details-button"}>Add to Favorites</button>
                    {isInWishlist && isLoggedIn? (
                        <button onClick={removeFromWishlistClick} className={"wishlist-button remove"}>Remove from Wishlist</button>
                    ) : (
                        <button onClick={onAddWishlistClick} className={"wishlist-button add"}>Add to Wishlist</button>
                    )}
                </div>
            </div>
        </div>
    </>
}

function DetailsMapContainer({movie, persons, directors}) {

    const names = persons.map(person => person.name).join(", ");

    return <>
        <div className={"details-map-container"}>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Type:
                </div>
                <div className={"detail-value"}>
                    Movie
                </div>
            </div>

            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Tagline:
                </div>
                <div className={"detail-value"}>
                    {movie.tagline ? movie.tagline : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Genre:
                </div>
                <div className={"detail-value"}>
                    {movie.genres ? movie.genres.map((genre) => genre.name).join(", ") : 'N/A'}
                </div>

            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Release:
                </div>
                <div className={"detail-value"}>
                    {movie.release_date ? movie.release_date : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Director:
                </div>
                <div className={"detail-value"}>
                    {directors ? directors : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Production:
                </div>
                <div className={"detail-value"}>
                    {movie.production_companies ? movie.production_companies.map(company => company.name).join(", ") : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Budget:
                </div>
                <div className={"detail-value"}>
                    {movie.budget === 0 ? 'N/A' : movie.budget.toLocaleString('en-US', {
                        style: "currency",
                        currency: "USD"
                    })}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Revenue:
                </div>
                <div className={"detail-value"}>
                    {movie.revenue === 0 ? 'N/A' : movie.revenue.toLocaleString('en-US', {
                        style: "currency",
                        currency: "USD"
                    })}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Main Casts:
                </div>
                <div className={"detail-value"}>
                    {names}
                </div>
            </div>
        </div>
    </>

}

function TopBilledCastsContainer({persons}) {
    return <div className={"cast-container-top"}>
        <div className={"hard-title"}>Top Billed Casts</div>
        <div className={"casts-list"}>
            {persons.map(person => <CastCard key={person.id} person={person}/>)}
        </div>
    </div>

}

function CastCard({person}) {
    const navigate = useNavigate();

    function onCardClick(){
        navigate(`/person-details/${person.id}`)
    }

    const placeholderImage = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
    return <div onClick={onCardClick} className={"cast-card"}>
        <div className={"cast-card-image"}>
            <img className={"cast-img"} src={person.profile_path ? person.profile_path : placeholderImage}
                 alt={"Person profile"} loading={"lazy"}
                 onError={(e) => {
                     e.target.alt = "image not found";
                     e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6mt1OeEHwXR9j2wmBfU1lQa0aeRaJv_Mjcx3Su3jNA&s"
                 }}/>
            <div className={"bg-overlay-person"}></div>
        </div>
        <div className={"cast-name"}>
            <div className={"real-name"}>
                {person.name}
            </div>
            <div className={"character-name"}>
                {person.character}
            </div>
        </div>
    </div>
}


export default MovieDetailsPage;
