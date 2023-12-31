import React from 'react';
import "./MovieCard.css";

function MovieCard({movie, onClick}) {


    return (<div className="movie-card" onClick={onClick}>
        <div className={"poster-container"}>
            <img className={"poster-image"} src={movie.poster_path} alt={movie.name + "'s poster"} loading={"lazy"}
                 onError={(e) => {
                     e.target.alt = "image not found";
                     e.target.src = "https://www.movienewz.com/img/films/poster-holder.jpg"
                 }}/>
            <div className={"bg-overlay"}></div>
        </div>
        {movie.release_date &&
            <div className={"movie-stats dimmed-color"}>
                <div>Movie</div>
                <div className={"dot"}>
                    | |
                </div>
                <div>{movie.release_date.slice(0, 4)}</div>
            </div>
        }
        <div className={"movie-name"}>
            <h3>{movie.title}</h3>
        </div>

    </div>)
        ;
}

export default MovieCard;