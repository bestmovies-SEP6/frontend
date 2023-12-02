// MovieCarousel.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCarousel.css"
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchNowPlayingMovies} from "../../../api/moviesApi";
import LoadingComponent from "../loading/loadingComponent";
import ErrorComponent from "../error/errorComponent";
function MovieCarousel() {
    const navigate = useNavigate(); // useNavigate instead of useHistory
    const [isDragging, setIsDragging] = useState(false); // State to track dragging


    const {data, error, isLoading} = useQuery({
        queryKey: ["CarouselData"],
        queryFn: fetchNowPlayingMovies
    });

    if (isLoading) return <LoadingComponent/>
    if (error) return <ErrorComponent error={error}/>

    console.log(data);


    function handleCarouselClick(id){
        if (!isDragging) {
            navigate(`/movie/${id}`);
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        beforeChange: () => setIsDragging(true), // Set isDragging to true before a slide change
        afterChange: () => setIsDragging(false), // Set isDragging back to false after a slide change
    };
    return (
        <Slider {...settings} >
            {data.slice(0, 7).map((movie, index) => (

                <div key={index} className="carousel-image" onClick={() => handleCarouselClick(movie.id)}>
                     <img src={movie.backdrop_path} alt={movie.title}  />
                </div>
            ))}
        </Slider>
    );
}
// Custom Arrow components
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "25px" }}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "25px" }}
            onClick={onClick}
        />
    );
}
export default MovieCarousel;
