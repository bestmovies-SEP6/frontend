

import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: null,
        jwtToken: null,
    },
    reducers: {
        setCredentials: function (state, action) {
            const { jwtToken, username } = action.payload;
            state.username = username;
            state.jwtToken = jwtToken;
        },

        logOut: function (state) {
            state.username = null;
            state.jwtToken = null;
        },
    }
});
export const { setCredentials, logOut } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;