import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function MovieCard({movie}) {
    const navigate = useNavigate(); // useNavigate instead of useHistory

    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`); // Use navigate function to change the route
    };

    return (<div className="movie" onClick={handleCardClick}>
    <div>
      <p>{movie.release_date}</p>
    </div>
    <div>
      <img
        src={
          movie.poster_path !== "N/A"
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
function MovieCardList(props){
const  {movies} = props;
    return  <div>
        { movies?.length > 0 ? (
            <div className="container">
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        ) :  (
            <p>No Movies</p>
        )}
    </div>

}
 export {MovieCard, MovieCardList};