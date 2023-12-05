import React from 'react';
import "./MovieDetailsPage.css";
import {useMovieDetailsByIdQuery, useSimilarMoviesByIdQuery} from "../../../redux/features/api/moviesApi";
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {useParams} from "react-router-dom";
import LoadingComponent from "../../components/loading/loadingComponent";
import {usePersonsByMovieIdQuery} from "../../../redux/features/api/personApi";
import FlatMoviesList from "../../components/flatMovieCard/FlatMovieCard";

function MovieDetailsPage() {
    const {id} = useParams();
    const {data: movie, isLoading: isLoadingMovie} = useMovieDetailsByIdQuery(id)
    const {data: persons, isLoading: isLoadingPersons} = usePersonsByMovieIdQuery(id);
    const {data: similarMovies, isLoading: isLoadingSimilarMovies} = useSimilarMoviesByIdQuery(id);


    const isLoading = isLoadingPersons || isLoadingMovie;

    if (isLoading) return <LoadingComponent/>;

    const directors = persons.filter(person => person.known_for_department === "Directing").map(person => person.name).join(", ");
    const topTen = persons.slice(0, 10);

    console.log(directors);
    console.log(topTen);


    return (
        <div className={"whole-container"}>
            <div className={"navbar-excluded"}>
                <div className={"content-section"}>
                    <DetailContainer movie={movie} persons={topTen} directors={directors}/>
                    <TopBilledCastsContainer persons={topTen}/>
                </div>
                <div className={"similar-section"}>
                    <div className={"hard-title"}>
                        You may like
                    </div>
                    {isLoadingSimilarMovies ? <LoadingComponent/> : <FlatMoviesList movies={similarMovies.slice(0, 10)}/>}
                </div>

            </div>
        </div>

    );
}

function DetailContainer({movie, persons, directors}) {
    return <>
        <div className={"movie-details-container"}>
            <div className={"poster-card"}>
                <img className={"poster-card-image"} src={movie.poster_path} alt={movie.name + "'s poster"} loading={"lazy"}/>
            </div>
            <div className={"details"}>
                <div className={"icons-holder"}>
                    <div className={"icon"}>
                        <StarBorderIcon/>
                        {movie.vote_average.toFixed(2)}
                    </div>
                    <div className={"icon"}>
                        {movie.release_date.substring(0, 4)}
                    </div>
                    <div className={"icon"}>
                        {movie.runtime} min
                    </div>
                </div>
                <div className={"title"}>
                    {movie.title}
                </div>
                <div className={"overview"}>
                    {movie.overview}
                </div>
                <DetailsMapContainer movie={movie} persons={persons} directors = {directors}/>

                <div className={"buttons"}>
                    <button className={"details-button"}>Add to Favorites</button>
                    <button className={"wishlist-button"}> Add to wishlist</button>
                </div>
            </div>
        </div>
    </>
}

function DetailsMapContainer({movie, persons, directors}) {

    const names = persons.map(person => person.name).join(", ");

    return <>
        <div className={"details-map-container"}>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Type:
                </div>
                <div className={"detail-value"}>
                    Movie
                </div>
            </div>

            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Tagline:
                </div>
                <div className={"detail-value"}>
                    {movie.tagline ? movie.tagline : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Genre:
                </div>
                <div className={"detail-value"}>
                    {movie.genres ? movie.genres.map((genre) => genre.name).join(", ") : 'N/A'}
                </div>

            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Release:
                </div>
                <div className={"detail-value"}>
                    {movie.release_date ? movie.release_date : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Director:
                </div>
                <div className={"detail-value"}>
                    {directors ? directors : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Production:
                </div>
                <div className={"detail-value"}>
                    {movie.production_companies ? movie.production_companies.map(company => company.name).join(", ") : 'N/A'}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Budget:
                </div>
                <div className={"detail-value"}>
                    {movie.budget === 0 ? 'N/A' : movie.budget.toLocaleString('en-US', {
                        style: "currency",
                        currency: "USD"
                    })}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Revenue:
                </div>
                <div className={"detail-value"}>
                    {movie.revenue === 0 ? 'N/A' : movie.revenue.toLocaleString('en-US', {
                        style: "currency",
                        currency: "USD"
                    })}
                </div>
            </div>
            <div className={"details-map"}>
                <div className={"detail-key"}>
                    Main Casts:
                </div>
                <div className={"detail-value"}>
                    {names}
                </div>
            </div>
        </div>
    </>

}

function TopBilledCastsContainer({persons}) {
    return <div className={"cast-container-top"}>
        <div className={"hard-title"}>Top Billed Casts</div>
        <div className={"casts-list"}>
            {persons.map(person => <CastCard key={person.id} person={person}/>)}
        </div>
    </div>

}

function CastCard({person}) {
    const placeholderImage = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
    return <div className={"cast-card"}>
        <div className={"cast-card-image"}>
            <img className={"cast-img"} src={person.profile_path ? person.profile_path : placeholderImage}
                 alt={"Person profile"} loading={"lazy"}/>
            <div className={"bg-overlay-person"}></div>

        </div>
        <div className={"cast-name"}>
            <div className={"real-name"}>
                {person.name}
            </div>
            <div className={"character-name"}>
                {person.character}
            </div>
        </div>
    </div>
}


export default MovieDetailsPage;