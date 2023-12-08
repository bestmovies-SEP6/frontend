import {baseApi} from "./setup";

const peopleApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            popularPeopleByPageNo: builder.query({
                query: (pageNo) => `Peoples/popular-person/${pageNo}`
            }),
            personDetailsByPersonId: builder.query({
                query: (personId) => `Peoples/person-details/${personId}`
            }),
            personMovieRolesByPersonId: builder.query({
                query: (personId) => `Peoples/person-movie-roles/${personId}`
            }),
            personMovePopularityByPersonId: builder.query({
                query: (personId) => `Peoples/person-movie-popularity/${personId}`
            }),
            personMovieGenreVariantsByPersonId: builder.query({
                query: (personId) => `Peoples/person-movie-genre-variation/${personId}`
            })
        })
    });
export const {  usePopularPeopleByPageNoQuery, usePersonDetailsByPersonIdQuery, usePersonMovieRolesByPersonIdQuery, usePersonMovePopularityByPersonIdQuery, usePersonMovieGenreVariantsByPersonIdQuery } = peopleApi;

