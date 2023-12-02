import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from "react-query";
import LoadingComponent from "../../components/loading/loadingComponent";
import ErrorComponent from "../../components/error/errorComponent";
import {useMovieDetailsByIdQuery} from "../../../redux/features/api/moviesApi";

function MovieDetailsPage() {
    const {id} = useParams();
    console.log("Got id from params:", id);

    const {data, isLoading, error} = useMovieDetailsByIdQuery(id);

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
