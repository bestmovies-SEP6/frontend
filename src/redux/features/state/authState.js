import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: null,
        jwtToken: null,
        expirationTime : null
    },
    reducers: {
        setCredentials: function (state, action) {
            const { jwtToken, username } = action.payload;
            state.username = username;
            state.jwtToken = jwtToken;

            // Expiration time is set to 1 hour
            state.expirationTime = Date.now() + 60 * 60 * 1000;
        },

        logOut: function (state) {
            state.username = null;
            state.jwtToken = null;
            state.expirationTime = null;
        },
    }
});
export const { setCredentials, logOut } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth && state.auth.jwtToken && state.auth.username && state.auth.expirationTime > Date.now();
export const selectUsername = (state) => state.auth.username;
export default authSlice.reducer;