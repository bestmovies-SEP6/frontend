import React from 'react';
import "./MovieSimpleCard.css";

function MovieSimpleCard({movie, onClick}) {

    return (<div className="movie-card" onClick={onClick}>
        <div className={"poster-container"}>
            <img className={"poster-image"} src={movie.poster_path} alt={movie.name + "'s poster"} loading={"lazy"}/>
            <div className={"bg-overlay"}></div>
        </div>
        <div className={"movie-name"}>
            <h3>{movie.title}</h3>
        </div>
    </div>);
}

export default MovieSimpleCard;