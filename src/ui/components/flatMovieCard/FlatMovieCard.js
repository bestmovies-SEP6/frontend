import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./FlatMovieCard.css";
import React from "react";
import {useNavigate} from "react-router-dom";

function FlatMoviesList({movies}) {
    return <div className={"flat-movies-container"}>
        {movies.map(movie => <MoviesFlatCard key={movie.id} movie={movie}/>)}
    </div>

}

function MoviesFlatCard({movie}) {
     const navigate =  useNavigate();
    function onClick(){
        navigate(`/movie/${movie.id}`);
    }

    return <div className={"flat-movie-card"} onClick={onClick}>
        <div className={"flat-poster"}>
            <img className={"flat-poster-image"} src={movie.poster_path} alt={movie.name + "'s poster"}
                 loading={"lazy"}/>
        </div>
        <div className={"flat-info"}>
            <div className={"flat-icons"}>
                <div className={"flat-icon"}>
                    <StarBorderIcon/>
                    {movie.vote_average.toFixed(2)}
                </div>
                <div className={"flat-icon"}>
                    {movie.release_date.substring(0, 4)}
                </div>
            </div>
            <div className={"flat-title"}>
                {movie.title}
            </div>
        </div>

    </div>
}

export default FlatMoviesList;