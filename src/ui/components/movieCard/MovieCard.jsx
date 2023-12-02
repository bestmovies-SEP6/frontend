import React from 'react';
import "./MovieCard.css";

function MovieCard({movie, onClick}) {

    return (<div className="movie" onClick={onClick}>
        <div>
            <p>{movie.release_date}</p>
        </div>
        <div>
            <img
                src={
                    movie.poster_path
                        ? movie.poster_path
                        : "https://via.placeholder.com/404"
                }
                alt={movie.title}
            />
        </div>
        <div>
            {/*<span>{movie.Type}</span>*/}
            <h3>{movie.title}</h3>
        </div>
    </div>);
}

export default MovieCard;