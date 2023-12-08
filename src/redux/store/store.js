import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {baseApi} from "../features/api/setup";
import authReducer from "../features/state/authState";
import storage from 'redux-persist/lib/storage'
import errorModalReducer from "../features/state/errorModalState";
import {persistReducer} from "redux-persist";
import {combineReducers} from "@reduxjs/toolkit";

const persistConfig = {
    storage,
    key: 'root',
    version: 1
}

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth : authReducer,
    errorModal: errorModalReducer,
    whitelist: ['auth']
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
export default store;