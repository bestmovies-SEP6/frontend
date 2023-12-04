// MovieCarousel.js
import React, { useState} from 'react';
import Slider from 'react-slick';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCarousel.css"
import {useNavigate} from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

import LoadingComponent from "../loading/loadingComponent";
import ErrorComponent from "../error/errorComponent";
import {useMovieDetailsByIdQuery, useNowPlayingMoviesQuery} from "../../../redux/features/api/moviesApi";

function MovieCarousel() {
    const [isDragging, setIsDragging] = useState(false); // State to track dragging


    const {data, error, isLoading} = useNowPlayingMoviesQuery()

    if (isLoading) return <LoadingComponent/>
    if (error) return <ErrorComponent error={error}/>

    console.log(data);

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: false,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        adaptiveHeight: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        beforeChange: () => setIsDragging(true), // Set isDragging to true before a slide change
        afterChange: () => setIsDragging(false), // Set isDragging back to false after a slide change
    };
    const movies = data.slice(0, 9)

    return (
        <>
            <Slider {...settings} className={"slider"}>
                {movies.map((movie, index) => (
                    <CarouselElement key={movie.id} movie={movie}/>
                ))}
            </Slider>
        </>

    )
        ;
}

function CarouselElement({movie}) {
    const {data, isLoading} = useMovieDetailsByIdQuery(movie.id)
    const navigate = useNavigate();


    const backGroundStyle = {
        backgroundImage: `url(${movie.backdrop_path})`,
        backgroundSize: "cover",

    }
    function onDetailsClick() {
        navigate("/movie/" + movie.id)
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
                    {isLoading || <>
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
                                {data.genres.map(genre => (
                                   " "+ genre.name + "  "
                                ))}
                            </div>
                        </div>
                        <div className={"movie-description dimmed-color"}>
                            {data.overview}
                        </div>
                    </>}
                    <div className={"buttons"}>
                        <button onClick={onDetailsClick} className={"details-button"}>View Details</button>
                        <button className={"wishlist-button"}> Add to wishlist</button>
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
