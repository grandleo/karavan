import {api} from "@/store/api/api";
import {combineReducers} from "@reduxjs/toolkit";
import {reducer as supplierStockReducer} from "@/store/slices/supplierStockSlice";
import {reducer as categoryReducer} from "@/store/slices/categorySlice";
import {reducer as stockClientReducer} from "@/store/slices/stockClientSlice";
import {reducer as adminSettingsReducer} from "@/store/slices/adminSettingsSlice";
import {reducer as ordersReducer} from "@/store/slices/ordersSlice";
import {reducer as stockReducer} from "@/store/slices/stockSlice";
import {reducer as specificationsReducer} from "@/store/slices/specificationsSlice";

export const rootReducers = combineReducers({
    [api.reducerPath]: api.reducer,
    supplierStock: supplierStockReducer,
    categories: categoryReducer,
    stockClient: stockClientReducer,
    adminSettings: adminSettingsReducer,
    orders: ordersReducer,
    stock: stockReducer,
    specifications: specificationsReducer
})