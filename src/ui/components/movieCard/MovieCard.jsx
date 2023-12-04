import React from 'react';
import "./MovieCard.css";

function MovieCard({movie, onClick}) {

    const backGroundStyle = {
        backgroundImage: `url(${movie.poster_path})`,
        backgroundSize: "cover",

    }

    return (<div className="movie-card" onClick={onClick}>
        <div className={"poster-container"}>
            <img className={"poster-image"} src={movie.poster_path} alt={movie.name + "'s poster"} loading={"lazy"}/>
            <div className={"bg-overlay"}></div>
        </div>
        <div className={"movie-stats dimmed-color"}>
            <div>Movie</div>
            <div className={"dot"}>
                | |
            </div>
            <div>{movie.release_date.slice(0, 4)}</div>
        </div>
        <div className={"movie-name"}>
            <h3>{movie.title}</h3>
        </div>
    </div>);
}

export default MovieCard;