import {api} from "@/store/api/api";
import {CREATE_WAREHOUSE_USER, GET_CATEGORIES_FOR_SUPPLIER_STOCK} from "@/config/apiRoutes";

export const stockSupplierApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStockSupplier: builder.query({
            query: (data) => ({url: 'supplier/stock', method: 'post', data: data}),
            providesTags: () => [{
                type: 'StockSupplier'
            }]
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
    })
})

export const {
    useGetStockSupplierQuery,
    useGetCategoriesForSupplierStockQuery,
    useGetCategoryProductsForSupplierStockQuery,
    useAddProductForSupplierStockMutation
} = stockSupplierApi