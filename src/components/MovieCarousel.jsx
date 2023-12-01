// MovieCarousel.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MovieCarousel.css"
import {useNavigate} from "react-router-dom";
import {fetchNowPlayingMovies} from "../api/apiinfo";
function MovieCarousel() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate(); // useNavigate instead of useHistory
    const [isDragging, setIsDragging] = useState(false); // State to track dragging

    function handleCarouselClick(id){
        if (!isDragging) {
            navigate(`/movie/${id}`);
        }
    }

    useEffect(() => {
        fetchNowPlayingMovies().then(data => {
            // Assuming the data returned is an array of movies
            // Adjust if the structure is different
            setMovies(data);
        }).catch(error => {
            console.error("Error fetching now playing movies:", error);
        });
    }, []);

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
        <Slider {...settings} className="carousel-container" >
            {movies.slice(0, 7).map((movie, index) => (

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
