// MovieCarousel.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCarousel.css"
import {useNavigate} from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

import LoadingComponent from "../loading/loadingComponent";
import {useMovieDetailsByIdQuery, useNowPlayingMoviesQuery} from "../../../redux/features/api/moviesApi";
import {toast} from "react-toastify";
import {
    useAddToWishlistMutation,
    useGetWishlistsQuery,
    useRemoveFromWishlistMutation
} from "../../../redux/features/api/wishlistApi";
import {selectIsLoggedIn} from "../../../redux/features/state/authState";
import {useSelector} from "react-redux";

function MovieCarousel() {

    const {data, error} = useNowPlayingMoviesQuery()

    if (error) {
        toast.update("loadingCarousel", {
            render: error.data,
            type: toast.TYPE.ERROR,
            autoClose: false,
            closeOnClick: false,
        })
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        adaptiveWidth: true,
        adaptiveHeight: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
    };
    return (
        <>
            {data ?
                (<Slider {...settings} className={"slider"}>
                    {data.slice(0, 9).map((movie) => (
                        <CarouselElement key={movie.id} movie={movie}/>
                    ))}
                </Slider>) : <LoadingComponent/>
            }
        </>

    );
}

function CarouselElement({movie}) {
    const {data} = useMovieDetailsByIdQuery(movie.id)
    const [addToWishlistMutation, {isLoading: isLoadingWishlistAdd}] = useAddToWishlistMutation();
    const [removeFromWishlist, {isLoading: isLoadingWishlistRemove}] = useRemoveFromWishlistMutation();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {data: wishLists} = useGetWishlistsQuery();

    let isInWishlist = false;
    if (wishLists) {
        isInWishlist = wishLists.some(movieItem => movieItem.id === movie.id);
    }


    const navigate = useNavigate();


    const backGroundStyle = {
        backgroundImage: `url(${movie.backdrop_path})`,
        backgroundSize: "cover",
    }

    function onDetailsClick() {
        navigate("/movie/" + movie.id)
    }

    if (isLoadingWishlistAdd) {
        toast.info("Adding to wishlist...", {
            toastId: "wishlist",
            autoClose: true,
            closeOnClick: false,
        })
    }

    if (isLoadingWishlistRemove) {
        toast.info("Removing from wishlist...", {
            toastId: "wishlist",
            autoClose: true,
            closeOnClick: false,
        })
    }

    async function onAddWishlistClick() {
        if (!isLoggedIn) {
            toast.error("Login is required to add to wishlist")
            return;
        }

        const {error} = await addToWishlistMutation(movie.id)

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

        console.log(error);
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


    return (
        <div className="carousel-image" style={backGroundStyle}>
            <div className={"navbar-gradient"}>

            </div>
            <div className={"gradient-wrapper"}>
                <div className={"details-container"}>
                    <div className={"movie-title"}>
                        {movie.title}
                    </div>
                    {!data || <>
                        <div className={"movie-details dimmed-color"}>
                            <div className={"movie-detail"}>
                                <StarBorderIcon/>
                                {data.vote_average.toFixed(2)}
                            </div>
                            <div className={"movie-detail"}>
                                <AccessAlarmsIcon/>
                                {data.runtime} min
                            </div>
                            <div className={"movie-detail genres"}>
                                {data.genres?.map(genre => (
                                    " " + genre.name + "  "
                                ))}
                            </div>
                        </div>
                        <div className={"movie-description dimmed-color"}>
                            {data.overview}
                        </div>
                    </>}
                    <div className={"buttons"}>
                        <button onClick={onDetailsClick} className={"details-button"}>View Details</button>
                        {isInWishlist && isLoggedIn ? (
                            <button onClick={removeFromWishlistClick} className={"wishlist-button remove"}>Remove from
                                Wishlist</button>
                        ) : (
                            <button onClick={onAddWishlistClick} className={"wishlist-button add"}>Add to
                                Wishlist</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Custom Arrow components
function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", left: "25px"}}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", right: "25px"}}
            onClick={onClick}
        />
    );
}

export default MovieCarousel;
