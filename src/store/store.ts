// import {combineReducers, configureStore, PreloadedState} from "@reduxjs/toolkit";
// import specificationsReducer from './slices/specificationsSlice'
// import {api} from "@/store/api/api";
//
// const rootReducer = combineReducers({
//     [api.reducerPath]: api.reducer,
//     // specifications: specificationsReducer
// })
//
// export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']


import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {api} from "@/store/api/api";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)