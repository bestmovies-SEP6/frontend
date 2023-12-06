
import React from "react";
import "../personDetails/PersonBiography.css";
import MovieSimpleCard from "./moviecard/MovieSimpleCard";
import {useNavigate} from "react-router-dom";

function PersonBiography({personData}) {
    const navigate = useNavigate();

    function onClickMovieCard(movieId) {
        navigate(`/movie/${movieId}`);
    }

    return (
        <div className={"person-biography-container"}>
            <h1>{personData.name}</h1>

            <div className={"person-biography"}>
                <h3>Biography</h3>
                <ParagraphComponent paragraph={personData.biography}/>
            </div>

            <div className={"known-for"}>
                <h3>Known For</h3>
                <div className={"known-for-container"}>
                    {personData.combined_credits.cast.map((movie, index) => (
                        <MovieSimpleCard movie={movie} key={index} onClick={() => onClickMovieCard(movie.id)}/>
                    )
                    )}
                </div>
            </div>
        </div>
    );
}

function ParagraphComponent({paragraph}) {
    return (
        <div className={"paragraph"}>
            {paragraph.split("\n").map(paragraph => <p>{paragraph }<br/></p>)}
        </div>
    )
}
export {PersonBiography};
