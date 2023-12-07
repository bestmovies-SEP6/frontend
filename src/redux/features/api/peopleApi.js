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
            personMoviePieChartDataByPersonId: builder.query({
                query: (personId) => `Peoples/person-movie-pie-chart/${personId}`
            }),
        })
    });
export const {  usePopularPeopleByPageNoQuery, usePersonDetailsByPersonIdQuery, usePersonMoviePieChartDataByPersonIdQuery } = peopleApi;

