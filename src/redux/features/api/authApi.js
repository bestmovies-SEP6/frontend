import {baseApi} from "./setup";

const authApi = baseApi
    .injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: { ...credentials}
            }),
        }),
        register: builder.mutation({
            query: ({username, password, email}) => ({
                url: 'auth/register',
                method: 'POST',
                body: {
                    username,
                    password,
                    email
                }
            })
        })
    })
});

export const {useLoginMutation, useRegisterMutation} = authApi;

