// MovieCarousel.js
import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCarousel.css"
import {useNavigate} from "react-router-dom";

import LoadingComponent from "../loading/loadingComponent";
import ErrorComponent from "../error/errorComponent";
import {useMovieDetailsByIdQuery, useNowPlayingMoviesQuery} from "../../../redux/features/api/moviesApi";

function MovieCarousel() {
    const navigate = useNavigate(); // useNavigate instead of useHistory
    const [isDragging, setIsDragging] = useState(false); // State to track dragging


    const {data, error, isLoading} = useNowPlayingMoviesQuery()

    if (isLoading) return <LoadingComponent/>
    if (error) return <ErrorComponent error={error}/>

    console.log(data);


    function handleCarouselClick(id) {
        if (!isDragging) {
            navigate(`/movie/${id}`);
        }
    }

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
    const {data, error, isLoading} = useMovieDetailsByIdQuery(movie.id)

    console.log("data  ========================================>", data);

    return (
        <div className="carousel-image">
            <div className={"overlay"}>
                <div className={"movie-title"}>
                    {movie.title}
                </div>
                {isLoading ||
                    <div className={"movie-details"}>
                        <div className={"movie-rating"}>
                            {data.vote_average}
                        </div>
                        <div className={"movie-runtime"}>
                            {data.runtime} min
                        </div>
                        <div className={"movie-genres"}>
                            {data.genres.map(genre => (
                                genre.name + " "
                            ))}
                        </div>
                        <div className={"movie-description"}>
                            {data.overview}
                        </div>
                    </div>}

            </div>
            {/*Out of overlay*/}
            <img src={movie.backdrop_path} alt={movie.title} loading={"lazy"}/>
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
