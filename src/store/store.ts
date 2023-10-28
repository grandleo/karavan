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
import supplierStockReducer from "@/store/slices/supplierStockSlice";
import {rootReducers} from "@/store/rootReducers";

// const rootReducer = combineReducers({
//     [api.reducerPath]: api.reducer,
//     supplierStock: supplierStockReducer
// })

export const store = configureStore({
    reducer: rootReducers,
    devTools: true,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

// export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch