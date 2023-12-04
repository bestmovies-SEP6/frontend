import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl: 'https://bestmovies-api-5azra6r55a-ew.a.run.app/',
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

