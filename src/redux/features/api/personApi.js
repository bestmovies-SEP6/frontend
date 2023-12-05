import {baseApi} from "./setup";

const moviesApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            personsByMovieId: builder.query({
                query: (movieId) => `Persons/movie/${movieId}`
            }),
        })
    });
export const {usePersonsByMovieIdQuery} = moviesApi;