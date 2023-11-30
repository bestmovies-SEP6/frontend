// MovieCarousel.js
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {fetchNowPlaying} from "../api/apiinfo";
import "../css/MovieCarousel.css"
function MovieCarousel() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchNowPlaying().then(data => {
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
        adaptiveHeight: true
    };
    return (
        <Slider {...settings} className="carousel-container">
            {movies.slice(0, 5).map((movie, index) => (

                <div key={index} className="carousel-image"  style={{backgroundImage: `url(${movie.poster_path})`}}>
                    {/* If you are using an img tag instead of background images */}
                     <img src={movie.poster_path} alt={movie.title} />
                    {console.log(movie)}
                </div>
            ))}
        </Slider>
    );
}

export default MovieCarousel;
