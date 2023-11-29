import React, { useState, useEffect } from "react";

import MovieCard from "../../components/MovieCard";
import { SearchBar } from "../../components/SearchBar";
import NavBar from "../../components/NavBar";

 function Home() {
  const [movies, setMovies] = useState([]);
    
  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e8ebe675";

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search)
    console.log(data.Search);
  };
  useEffect(() => {
     searchMovies('Nepal');
  }, []);

  return (
    <div className="app">
      <NavBar />

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
