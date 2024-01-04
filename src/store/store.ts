import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {api} from "@/store/api/api";
import {rootReducers} from "@/store/rootReducers";

export const store = configureStore({
    reducer: rootReducers,
    devTools: true,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch