import {api} from "@/store/api/api";
import {combineReducers} from "@reduxjs/toolkit";
import {reducer as supplierStockReducer} from "@/store/slices/supplierStockSlice";
import {reducer as categoryReducer} from "@/store/slices/categorySlice";
import {reducer as stockClientReducer} from "@/store/slices/stockClientSlice";
import {reducer as adminSettingsReducer} from "@/store/slices/adminSettingsSlice";
import {reducer as ordersReducer} from "@/store/slices/ordersSlice";
import {reducer as stockReducer} from "@/store/slices/stockSlice";
import {reducer as specificationsReducer} from "@/store/slices/specificationsSlice";
import {reducer as clientsReducer} from "@/store/slices/clientSlice";
import {reducer as logisticsReducer} from "@/store/slices/logisticSlice";
import {reducer as suppliersReducer} from "@/store/slices/supplierSlice";
import {reducer as adminsReducer} from "@/store/slices/adminsSlice";
import {reducer as productReducer} from "@/store/slices/productSlice"
import {reducer as warehouseReducer} from "@/store/slices/warehouseSlice";
import {reducer as botsApiReducer} from "@/store/slices/botsApiSlice";

export const rootReducers = combineReducers({
    [api.reducerPath]: api.reducer,
    supplierStock: supplierStockReducer,
    categories: categoryReducer,
    stockClient: stockClientReducer,
    adminSettings: adminSettingsReducer,
    orders: ordersReducer,
    stock: stockReducer,
    specifications: specificationsReducer,
    clients: clientsReducer,
    logistics: logisticsReducer,
    suppliers: suppliersReducer,
    admins: adminsReducer,
    products: productReducer,
    //Оптимизировано
    warehouse: warehouseReducer,
    botApi: botsApiReducer
})