import {api} from "@/store/api/api";
import {CREATE_WAREHOUSE_USER, GET_CATEGORIES_FOR_SUPPLIER_STOCK} from "@/config/apiRoutes";
import echo from "@/config/laravel-echo";
import {Channel} from "laravel-echo";
import _ from "lodash";

export const stockSupplierApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStockSupplier: builder.query({
            query: (dataQ) => ({url: 'supplier/stock', method: 'post', data: dataQ}),
            providesTags: () => [{
                type: 'StockSupplier'
            }],
            async onCacheEntryAdded(data, { dispatch }) {
                echo.channel('Stock').listen('UpdateStockEvent', (data) => {
                    dispatch(api.util?.invalidateTags(['StockSupplier']))
                });
            }
        }),
        getCategoriesForSupplierStock: builder.query({
            query: () => ({url: 'supplier/stock/add/get-categories', method: 'get'}),
            providesTags: () => [{
                type: 'AddStockCategories'
            }]
        }),
        getCategoryProductsForSupplierStock: builder.query({
            query: (data) => ({url: 'supplier/stock/add/get-category-products', method: 'post', data: data}),
            providesTags: () => [{
                type: 'AddStockProducts'
            }]
        }),
        addProductForSupplierStock: builder.mutation({
            query: (data) => ({url: 'supplier/stock/add', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'StockSupplier'
            }]
        }),
    }),
})

export const {
    useGetStockSupplierQuery,
    useGetCategoriesForSupplierStockQuery,
    useGetCategoryProductsForSupplierStockQuery,
    useAddProductForSupplierStockMutation
} = stockSupplierApi