import {api} from "@/store/api/api";
import {combineReducers} from "@reduxjs/toolkit";
import {reducer as supplierStockReducer} from "@/store/slices/supplierStockSlice";

export const rootReducers = combineReducers({
    [api.reducerPath]: api.reducer,
    supplierStock: supplierStockReducer
})