import React, {useState} from 'react';
import "./MovieDetailsPage.css";
import {useMovieDetailsByIdQuery, useSimilarMoviesByIdQuery} from "../../../redux/features/api/moviesApi";
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {useLocation, useNavigate, useParams} from "react-router-dom";
import LoadingComponent from "../../components/loading/loadingComponent";
import {usePersonsByMovieIdQuery} from "../../../redux/features/api/personApi";
import FlatMoviesList from "../../components/flatMovieCard/FlatMovieCard";
import {toast} from "react-toastify";
import {
    useAddToWishlistMutation,
    useGetWishlistsQuery,
    useRemoveFromWishlistMutation
} from "../../../redux/features/api/wishlistApi";
import {useSelector} from "react-redux";
import {selectIsLoggedIn, selectUsername} from "../../../redux/features/state/authState";
import {
    useDeleteReviewMutation,
    useFetchReviewsQuery,
    usePostReviewMutation
} from "../../../redux/features/api/reviewsApi";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar'
import {timeAgo} from "../../../utils/date";
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from "../../components/pagination/Pagination";
import {Bar, Line} from "react-chartjs-2";

function MovieDetailsPage() {
    const {id} = useParams();
    const {data: movie} = useMovieDetailsByIdQuery(id)
    const {data: persons} = usePersonsByMovieIdQuery(id);
    const {data: similarMovies} = useSimilarMoviesByIdQuery(id);

    let directors = "";
    let topTen = [];


    if (persons) {
        directors = persons.filter(person => person.known_for_department === "Directing").map(person => person.name).join(", ");
        topTen = persons.slice(0, 10);
    }


    return (
        <div className={"whole-container"}>
            <div className={"navbar-excluded"}>
                <div className={"content-section"}>
                    {movie ? <>
                        <DetailContainer movie={movie} persons={topTen} directors={directors}/>
                        <TopBilledCastsContainer persons={topTen}/>
                        <SelectOptionToChooseWhich movie={movie} people={persons}/>
                    </> : <LoadingComponent/>
                    }
                    <div className={"reviews-section"}>
                        <div className={"hard-title"}>
                            Reviews
                        </div>
                        {movie ? <ReviewListsContainer movie={movie}/> : <LoadingComponent/>}
                    </div>
                </div>
                <div className={"similar-section"}>
                    <div className={"hard-title"}>
                        You may like
                    </div>
                    {!similarMovies ? <LoadingComponent/> :
                        <FlatMoviesList movies={similarMovies.slice(0, 10)}/>}
                </div>
            </div>
        </div>

    );
}

function ReviewListsContainer({movie}) {

    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    let pageNo = parseInt(params.get('pageNo'));
    if (isNaN(pageNo) || pageNo < 1) pageNo = 1;

    console.log(pageNo)

    const {data: response, isLoading, error} = useFetchReviewsQuery({movieId :movie.id, pageNo});
    if (response) console.log(response);


    function onNext(){
        navigateToPage(pageNo+1);
    }
    function onPrev(){
        navigateToPage(pageNo-1);
    }

    function navigateToPage(pageNumber) {
        const navigateAddress = new URLSearchParams();
        navigateAddress.append('pageNo', pageNumber);

        navigate(`/movie/${movie.id}?${navigateAddress.toString()}`)
    }


    if (error) {
        toast.error(error.data, {
            autoClose: false,
        });
        return <p>Something went wrong..</p>
    }

    let reviews = [];
    if (response) {
        reviews = response.reviews;
    }
    return <div className={"reviews-list-container"}>
        {isLoading || !response ? <LoadingComponent/>
            :
            <div>
                {reviews.length === 0 ? <>
                        <p className={"no-reviews"}>This movies doesnt have any reviews yet.. Be the first one to
                            review.....</p>
                        <ReviewInput movie_id={movie.id}/>

                    </>
                    :
                    <>
                        <div>
                            <div className={"hard-title reviews-count"}>
                                BestMovies Reviews :
                                <ReadonlyRating value={response.average_rating}/>
                                ({response.total_reviews} reviews)
                            </div>
                        </div>
                        <ReviewInput movie_id={movie.id}/>
                        <div className={"reviews-container"}>
                            {reviews.map(review => <ReviewCard key={review.id} review={review}/>)}
                        </div>
                        <Pagination total_pages={response.total_pages} onNext={onNext} onPrevious={onPrev} onPageClick={navigateToPage}/>
                    </>}
            </div>
        }
    </div>

}


function ReadonlyRating({value}) {

    const color = value >= 4 ? '#a4bf43' : value >= 3 ? '#67a636' : value >= 2 ? '#f5c518' : '#e50914';
    return <Rating
        name="read-only"
        value={value}
        precision={0.1}
        readOnly
        sx={{
            color: color,
        }}
        emptyIcon={<StarIcon style={{
            opacity: 0.55,
            color: '#728290',
        }} fontSize="inherit"/>}
    />
}

function ReviewInput({movie_id}) {
    const [review, setReview] = React.useState();
    const [rating, setRating] = React.useState(2.5);
    const [hover, setHover] = React.useState(-1);

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [reviewMutation, {isLoading}] = usePostReviewMutation();

    const labels = {
        0.5: 'Abysmal',
        1: 'Awful',
        1.5: 'Poor',
        2: 'Below Average',
        2.5: 'Mediocre',
        3: 'Decent',
        3.5: 'Good',
        4: 'Great',
        4.5: 'Excellent',
        5: 'Outstanding',
    }

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    if (isLoading) {
        toast.info("Adding review...", {
            toastId: "review",
            autoClose: false,
        });
    }

    async function onAddClick() {
        if (!isLoggedIn) {
            toast.error("Login is required to add a review")
            return;
        }
        if (!review || review.trim().length === 0) {
            toast.error("Review cannot be empty")
            return;
        }
        const {error} = await reviewMutation({movie_id, description: review.trim(), rating})

        if (error) {
            console.log(error);
            toast.update("review", {
                render: error.data,
                type: toast.TYPE.ERROR,
            });
            return;
        }
        toast.update("review", {
            render: "Review added successfully",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
        });
        setRating(2.5);
        setReview("");
    }

    return <div className={"review-input"}>
        <FormControl
            sx={{
                width: '100%',
                marginBottom: '1rem',
            }}
        >
            <FormLabel sx={{
                color: 'var(--primary)',
                fontSize: '1rem',
            }}>Your review</FormLabel>
            <Textarea
                placeholder="Write your review here ..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                minRows={2}
                maxRows={3}
                sx={{
                    width: '100%',
                    border: 'none',
                    backgroundColor: '#131e2e',
                    color: '#fff',
                    "--Textarea-focusedHighlight": '#67a636 !important',
                }}
                startDecorator={
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            paddingLeft: '75%',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={rating}
                            precision={0.5}
                            getLabelText={getLabelText}
                            sx={{
                                color: '#a4bf43',
                            }}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{
                                opacity: 0.55,
                                color: '#728290',
                            }} fontSize="inherit"/>}
                        />
                        {rating !== null && (
                            <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : rating]}</Box>
                        )}
                    </Box>
                }
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            flex: 'auto',
                            marginRight: '1rem'
                        }}
                    >
                        <Button onClick={onAddClick} sx={
                            {
                                ml: 'auto',
                                backgroundColor: '#67a636',
                                backgroundHover: '#578d2e',
                            }
                        }>Add</Button>
                    </Box>
                }
            />
        </FormControl>
    </div>
}

function ReviewCard({review}) {
    const userName = useSelector(selectUsername);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [deleteReviewMutation, {isLoading}] = useDeleteReviewMutation();

    if (isLoading) {
        toast.info("Deleting review...", {
            toastId: "review",
            autoClose: false,
        });
    }

    async function onDeleteClick() {
        const {error} = await deleteReviewMutation(review.id);
        if (error) {
            toast.update("review", {
                render: error.data,
                type: toast.TYPE.ERROR,
            });
        }
        toast.update("review", {
            render: "Review deleted successfully",
            type: toast.TYPE.SUCCESS,
            autoClose: 3000,
        });
    }

    return <div className={"review"}>
        <div className={"avatar"}>
            <ListItemAvatar>
                <Avatar alt={review.author} sx={{
                    backgroundColor: '#67a636',
                }} children={review.author[0].toUpperCase()}/>
            </ListItemAvatar>
        </div>
        <div className={"review-details"}>
            <div className={"review-heading"}>
                <div className={"review-author"}>
                    <p>{review.author}</p>
                    <p><ReadonlyRating value={review.rating}/></p>
                </div>
                <div onClick={onDeleteClick} className={"delete-icon"}>
                    {isLoggedIn && userName === review.author &&
                        <DeleteIcon/>
                    }
                </div>
            </div>
            <div className={"review-date"}>
                {timeAgo(review.authored_at)}
            </div>
            <div className={"review-content"}>
                {review.description}
            </div>
        </div>
    </div>
}

function DetailContainer({movie, persons, directors}) {

    const [addToWishListMutation, {isLoading}] = useAddToWishlistMutation()
    const [removeFromWishlist, {isLoading: isLoadingWishlistRemove}] = useRemoveFromWishlistMutation();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {data: wishLists} = useGetWishlistsQuery();

    if (isLoading) {
        toast.info("Adding to wishlist...", {
            toastId: "wishlist",
            autoClose: false,
        });
    }

    if (isLoadingWishlistRemove) {
        toast.info("Removing from wishlist...", {
            toastId: "wishlist",
            autoClose: false,
        });
    }

    let isInWishlist = false;

    if (wishLists) {
        isInWishlist = wishLists.some(movieItem => movieItem.id === movie.id);
    }

    async function onAddWishlistClick() {
        if (!isLoggedIn) {
            toast.error("Login is required to add a wishlist")
            return;
        }

        const {error} = await addToWishListMutation(movie.id)

        if (error) {
            toast.update("wishlist", {
                render: error.data,
                type: toast.TYPE.ERROR,
                autoClose: false,
                closeOnClick: false,
            })
            return;
        }
        toast.update("wishlist", {
            render: "Added to wishlist",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
            closeOnClick: false,
        })
    }

    async function removeFromWishlistClick() {
        if (!isLoggedIn) {
            toast.error("Login is required to remove a wishlist")
            return;
        }

        const {error} = await removeFromWishlist(movie.id)

        if (error) {
            toast.update("wishlist", {
                render: error.data,
                type: toast.TYPE.ERROR,
                autoClose: false,
                closeOnClick: false,
            })
            return;
        }
        toast.update("wishlist", {
            render: "Removed from wishlist",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
            closeOnClick: false,
        })
    }

    function onAddToFavoritesClick() {
        toast.info("This feature is not implemented yet..");
    }

    return <>
        <div className={"movie-details-container"}>
            <div className={"poster-card"}>
                <img className={"poster-card-image"} src={movie.poster_path} alt={movie.name + "'s poster"}
                     loading={"lazy"}/>
            </div>
            <div className={"details"}>
                <div className={"icons-holder"}>
                    <div className={"icon"}>
                        <StarBorderIcon/>
                        {movie.vote_average?.toFixed(2)}
                    </div>
                    <div className={"icon"}>
                        {movie.release_date?.substring(0, 4)}
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
                <DetailsMapContainer movie={movie} persons={persons} directors={directors}/>

                <div className={"buttons"}>
                    <button onClick={onAddToFavoritesClick} className={"details-button"}>Add to Favorites</button>
                    {isInWishlist && isLoggedIn ? (
                        <button onClick={removeFromWishlistClick} className={"wishlist-button remove"}>Remove from
                            Wishlist</button>
                    ) : (
                        <button onClick={onAddWishlistClick} className={"wishlist-button add"}>Add to Wishlist</button>
                    )}
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

function TopBilledCastsContainer({
                                     persons
                                 }) {
    return <div className={"cast-container-top"}>
        <div className={"hard-title"}>Top Billed Casts</div>
        <div className={"casts-list"}>
            {persons.map(person => <CastCard key={person.id} person={person}/>)}
        </div>
    </div>

}

function CastCard({
                      person
                  }) {
    const navigate = useNavigate();

    function onCardClick() {
        navigate(`/person-details/${person.id}`)
    }

    const placeholderImage = 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
    return <div onClick={onCardClick} className={"cast-card"}>
        <div className={"cast-card-image"}>
            <img className={"cast-img"} src={person.profile_path ? person.profile_path : placeholderImage}
                 alt={"Person profile"} loading={"lazy"}
                 onError={(e) => {
                     e.target.alt = "image not found";
                     e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6mt1OeEHwXR9j2wmBfU1lQa0aeRaJv_Mjcx3Su3jNA&s"
                 }}/>
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


function BarChartForBoxOffice({boxOffice, budget}) {
    if (boxOffice === 0 && budget === 0) return <></>;

    const labels = ["Box Office", "Budget"];
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Box office vs Budget',
                data: Object.values({boxOffice, budget}),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: '60vh', width: '90%' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
}

function LineChartForPopularity({people}) {
    if (!people) return <></>;
    console.log("people")
    console.log(people);
    // Sort the data by release date
    const labels = people.map(item => item.name);
    const dataPoints = people.map(item => item.popularity);
    const data = {
        labels,
        datasets: [
            {
                label: 'Actor Popularity Scores',
                data: dataPoints,
                fill: true,
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Popularity Score'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Name'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        // Get the index of the hovered item
                        const index = tooltipItems[0].dataIndex;
                        // Return the movie title for that index
                        return people[index].name;
                    },
                    label: function (tooltipItem) {
                        return `Popularity: ${tooltipItem.formattedValue}`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: '60vh', width: '90%' }}>
            <Line datasetIdKey="popularity" data={data} options={options}/>
        </div>
    )

}

function SelectOptionToChooseWhich(props){

    const { movie, people } = props;
    const [selectedChart, setSelectedChart] = useState("barChart");

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    }

    return(
        <div>
            <h1 className={"statsHeading"}>Statistics</h1>
            <div className="movie-statistic-container">
                <select onChange={handleChartChange} value={selectedChart} className="select-style">
                    <option value="lineChart">Line Chart For Popularity</option>
                    <option value="barChart">Bar Chart For Box Office</option>
                </select>
                {selectedChart === "barChart" && <BarChartForBoxOffice boxOffice={movie.revenue} budget={movie.budget}/>}
                {selectedChart === "lineChart" &&  <LineChartForPopularity people={people} />}
            </div>
        </div>
    )
}

export default MovieDetailsPage;
