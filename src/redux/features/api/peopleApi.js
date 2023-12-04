import {baseApi} from "./setup";

const peopleApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            popularPeopleByPageNo: builder.query({
                query: (pageNo) => `Peoples/popular-person/${pageNo}`
            }),
        })
    });
export const {  usePopularPeopleByPageNoQuery } = peopleApi;

