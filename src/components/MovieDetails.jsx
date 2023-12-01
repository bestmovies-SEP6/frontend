import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {fetchMovieDetails} from "../api/apiinfo";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieDetails(id).then(data => {
            setMovie(data);
        });
    }, [id]);

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            {/* Display other details about the movie */}
        </div>
    );
}

export default MovieDetails;
