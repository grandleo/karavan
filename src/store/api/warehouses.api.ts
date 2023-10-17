import {api} from "@/store/api/api";
import {
    CREATE_WAREHOUSE_USER,
    GET_WAREHOUSES_USER, SUPPLIER_SET_PRICE_PRODUCT_WAREHOUSE, SUPPLIER_SET_QTY_PRODUCT_WAREHOUSE
} from "@/config/apiRoutes";

export const WarehousesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWarehouses: builder.query({
            query: () => ({url: GET_WAREHOUSES_USER, method: 'get'}),
            providesTags: () => [{
                type: 'Warehouses'
            }]
        }),
        createWarehouse: builder.mutation({
            query: (data) => ({url: CREATE_WAREHOUSE_USER, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Warehouses'
            }]
        }),
        addPriceWarehouseProduct: builder.mutation({
            query: (data) => ({url: SUPPLIER_SET_PRICE_PRODUCT_WAREHOUSE, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Products'
            }]
        }),
        addQtyWarehouseProduct: builder.mutation({
            query: (data) => ({url: SUPPLIER_SET_QTY_PRODUCT_WAREHOUSE, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Products'
            }]
        })
    })
})

export const {
    useGetWarehousesQuery,
    useCreateWarehouseMutation,
    useAddPriceWarehouseProductMutation,
    useAddQtyWarehouseProductMutation
} = WarehousesApi;