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
        })
    });
export const {  usePopularPeopleByPageNoQuery, usePersonDetailsByPersonIdQuery } = peopleApi;

