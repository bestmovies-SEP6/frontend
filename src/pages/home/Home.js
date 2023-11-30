import React, { useState, useEffect, Component } from "react";

import { useMoviesInformationContext} from "../../contexts/MoviesInformationContext";
import MovieCard from "../../components/MovieCard";
import "../../css/Home.css"
 function Home() {
     const {isLoading, isError, data } = useMoviesInformationContext();
/*  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e8ebe675";*/
     // Check if the data is available and has a 'Search' property
     const movies = data?.Search;
  return (
      <div >
          {
              movies?.length > 0
                  ?(
                      <div className="container">
                          {movies.map((movie) => (
                              <MovieCard movie={movie}/>
                          ))}
                      </div>
                  ) : (
                      <div className="empty">
                          <h2> No movies found</h2>
                      </div>
                  )
          }
      </div>
  );
}

export {Home};
