import {api} from "@/store/api/api";
import {combineReducers} from "@reduxjs/toolkit";
import {reducer as supplierStockReducer} from "@/store/slices/supplierStockSlice";
import {reducer as categoryReducer} from "@/store/slices/categorySlice";
import {reducer as stockReducer} from "@/store/slices/stockClientSlice";

export const rootReducers = combineReducers({
    [api.reducerPath]: api.reducer,
    supplierStock: supplierStockReducer,
    categories: categoryReducer,
    stock: stockReducer
})