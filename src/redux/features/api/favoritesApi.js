import {baseApi} from "./setup";

const favoritesApi= baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            addToFavorites: builder.mutation({
                query: (movieId) => ({
                    url: `Favorites/${movieId}`,
                    method: 'POST'
                }),
                // This makes sure that the query with the tag 'Wishlists' is re-fetched after this mutation
                invalidatesTags: ['Favorites'] // 1
            }),

            removeFromFavorites: builder.mutation({
                query: (movieId) => ({
                    url: `Favorites/${movieId}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['Favorites']
            }),
            getFavorites: builder.query({
                query: () => 'Favorites',
                providesTags: ['Favorites']
            }),
        })
    });

export const {useAddToFavoritesMutation,useRemoveFromFavoritesMutation, useGetFavoritesQuery} = favoritesApi;