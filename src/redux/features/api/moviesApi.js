import {baseApi} from "./setup";

const moviesApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            nowPlayingMovies: builder.query({
                query: () => 'Movies/now-playing'
            }),
            trendingMovies: builder.query({
                query: () => 'Movies/trending'
            }),
            topRatedMovies: builder.query({
                query: () => 'Movies/top-rated'
            }),
            popularMovies: builder.query({
                query: () => 'Movies/popular'
            }),
            movieDetailsById: builder.query({
                query: (movieId) => `Movies/details/${movieId}`
            }),
            similarMoviesById: builder.query({
                query: (movieId) => `Movies/${movieId}/similar`
            }),
        })
    });
 export const {useNowPlayingMoviesQuery, useTrendingMoviesQuery, useTopRatedMoviesQuery, usePopularMoviesQuery, useMovieDetailsByIdQuery, useSimilarMoviesByIdQuery} = moviesApi;

