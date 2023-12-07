import React from "react";
import "../personDetails/PersonBiography.css";
import MovieSimpleCard from "./moviecard/MovieSimpleCard";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function PersonBiography({personData}) {
    const navigate = useNavigate();

    function showToast(errorData) {
        toast.error(errorData, {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true
        });
    }

    function onClickMovieCard(movie) {
        if (movie.media_type === "tv") {
            showToast("TV shows are not supported yet")
        } else {
            navigate(`/movie/${movie.id}`);
        }
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

                <h4>Acting</h4>
                <div className={"known-for-container"}>
                    {personData.combined_credits.cast.map((movie, index) => (
                            <MovieSimpleCard movie={movie} key={index} onClick={() => onClickMovieCard(movie)}/>
                        )
                    )}
                </div>

                <h4>Crew</h4>
                <div className={"known-for-container"}>
                    {personData.combined_credits.crew.map((movie, index) => (
                            <MovieSimpleCard movie={movie} key={index} onClick={() => onClickMovieCard(movie)}/>
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
            {paragraph.split("\n").map(paragraph => <p>{paragraph}<br/></p>)}
        </div>
    )
}

export {PersonBiography};
