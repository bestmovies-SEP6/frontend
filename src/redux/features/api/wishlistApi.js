import {baseApi} from "./setup";

const wishlistApi= baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            addToWishlist: builder.mutation({
                query: (movieId) => ({
                    url: `Wishlists/${movieId}`,
                    method: 'POST'
                }),
                // This makes sure that the query with the tag 'Wishlists' is re-fetched after this mutation
                invalidatesTags: ['Wishlists'] // 1
            }),
            getWishlists: builder.query({
                query: () => 'Wishlists',
                providesTags: ['Wishlists']
            }),
        })
    });

export const {useAddToWishlistMutation, useGetWishlistsQuery} = wishlistApi;