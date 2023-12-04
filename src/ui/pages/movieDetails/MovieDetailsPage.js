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
    const {data: movie, isLoading: isLoadingMovie, error: errorMovie} = useMovieDetailsByIdQuery(id)
    const {data: persons, isLoading: isLoadingPersons, error: errorPersons} = usePersonsByMovieIdQuery(id);
    const {data: similarMovies, isLoading: isLoadingSimilarMovies} = useSimilarMoviesByIdQuery(id);


    const isLoading = isLoadingPersons || isLoadingMovie;

    if (isLoading) return <LoadingComponent/>;

    const topTen = persons.slice(0, 10);

    console.log(movie);


    return (
        <div className={"whole-container"}>
            <div className={"navbar-excluded"}>
                <div className={"content-section"}>
                    <DetailContainer movie={movie} persons={topTen}/>
                    <TopBilledCastsContainer persons={topTen}/>
                </div>
                <div className={"similar-section"}>
                    <div className={"hard-title"}>
                        You may like
                    </div>
                    {isLoading ? <LoadingComponent/> : <FlatMoviesList movies={similarMovies.slice(0,10)}/>}

                </div>

            </div>
        </div>

    );
}

function DetailContainer({movie, persons}) {
    const posterBackground = {
        backgroundImage: `url(${movie.poster_path})`,
        backgroundSize: "cover",

    }
    console.log(persons);
    const director = persons.find(person => person.known_for_department === "Directing");
    const topTenCasts = persons.map(person => person.name).join(", ");
    return <>
        <div className={"movie-details-container"}>
            <div className={"poster-card"} style={posterBackground}>
                {/*This is empty because the background image is set in the style attribute}*/}
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
                <div className={"details-map"}>
                    <div className={"detail-key"}>
                        <p>Type:</p>
                        <p>Tagline: </p>
                        <p>Genre:</p>
                        <p>Release:</p>
                        <p>Director:</p>
                        <p>Production:</p>
                        <p>Budget</p>
                        <p>Revenue:</p>
                        <p>Main Casts: </p>
                    </div>
                    <div className={"detail-value"}>
                        <p>Movie</p>
                        <p>{movie.tagline}</p>
                        <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                        <p>{movie.release_date}</p>
                        <p>{director ? 'N/A' : director}</p>
                        <p>{movie.production_companies.map(company => company.name).join(", ")}</p>
                        <p>{movie.budget === 0 ? 'N/A' : movie.budget.toLocaleString('en-US', {
                            style: "currency",
                            currency: "USD"
                        })}</p>
                        <p>{movie.revenue === 0 ? 'N/A' : movie.revenue.toLocaleString('en-US', {
                            style: "currency",
                            currency: "USD"
                        })}</p>
                        <p>{topTenCasts}</p>
                    </div>
                </div>

                <div className={"buttons"}>
                    <button className={"details-button"}>Add to Favorites</button>
                    <button className={"wishlist-button"}> Add to wishlist</button>
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
