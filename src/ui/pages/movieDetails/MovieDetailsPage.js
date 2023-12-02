import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {fetchMovieDetailsById} from "../../../api/moviesApi";
import {useQuery} from "react-query";
import LoadingComponent from "../../components/loading/loadingComponent";
import ErrorComponent from "../../components/error/errorComponent";

function MovieDetailsPage() {
    const { id } = useParams();
    console.log("Got id from params:", id);

    const {data, error, isLoading} = useQuery({
        queryKey: ["MovieDetailsPage", id],
        queryFn: () => fetchMovieDetailsById(id)
    });

    if (isLoading) return <LoadingComponent/>;
    if (error) return <ErrorComponent error={error}/>;


    return (
        <div>
            <h1>{data.title}</h1>
            {/* Display other details about the movie */}
        </div>
    );
}

export default MovieDetailsPage;
