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
            searchMovies: builder.query({
                query: ({pageNo, query, region, year}) => {
                    const params = new URLSearchParams();
                    if (pageNo)
                        params.append('pageNo', pageNo);

                    if (query)
                        params.append('query', query);

                    if (region) {
                        params.append('region', region);
                    }
                    if (year) {
                        params.append('year', year);
                    }
                    return `Movies/?${params.toString()}`
                }
            })
        })
    });
export const {
    useNowPlayingMoviesQuery,
    useTrendingMoviesQuery,
    useTopRatedMoviesQuery,
    usePopularMoviesQuery,
    useMovieDetailsByIdQuery,
    useSimilarMoviesByIdQuery,
    useSearchMoviesQuery
} = moviesApi;

