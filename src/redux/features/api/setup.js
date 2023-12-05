import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


    const remoteApi = "https://bestmovies-api-5azra6r55a-ew.a.run.app/";
    //const localApi = "http://localhost:5086/";


const baseQuery = fetchBaseQuery({
    baseUrl: remoteApi,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.jwtToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

export const baseApi = createApi({
    baseQuery: baseQuery,
    endpoints : () => ({}),
});

