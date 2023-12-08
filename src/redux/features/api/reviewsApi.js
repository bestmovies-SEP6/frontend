import {baseApi} from "./setup";

const reviewsApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            postReview: builder.mutation({
                query: (review) => ({
                    url: 'reviews',
                    method: 'POST',
                    body: {...review}
                }),
                invalidatesTags: ["Reviews"]
            }),
            deleteReview: builder.mutation({
                query: (reviewId) => ({
                    url: `reviews/${reviewId}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ["Reviews"]
            }),
            fetchReviews: builder.query({
                query: ({movieId, pageNo}) => {
                    const params = new URLSearchParams();
                    if (pageNo)
                        params.append('page', pageNo);

                    console.log(`reviews/${movieId}?${params.toString()}`);
                    return `reviews/${movieId}?${params.toString()}`

                },
                providesTags: ["Reviews"]
            }),
        })});

export const {usePostReviewMutation,useDeleteReviewMutation, useFetchReviewsQuery} = reviewsApi;