// import {configureStore} from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query'
// import {api} from "@/store/api/api";
// import {rootReducers} from "@/store/rootReducers";
//
// export const store = configureStore({
//     reducer: rootReducers,
//     devTools: true,
//     // Adding the api middleware enables caching, invalidation, polling,
//     // and other useful features of `rtk-query`.
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(api.middleware),
// })
//
// setupListeners(store.dispatch)
//
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import {configureStore} from "@reduxjs/toolkit";
import {api} from "@/store/apiSlice";
import authReducer from "@/features/auth/api/authSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            // Добавляем RTK Query reducer
            [api.reducerPath]: api.reducer,
            auth: authReducer,
            // Здесь можно добавить другие редьюсеры
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;