import {api} from "@/store/api/api";
import {
    GET_DAYS_WEEK,
    GET_WAREHOUSE,
    SUPPLIER_SET_PRICE_PRODUCT_WAREHOUSE,
    SUPPLIER_SET_QTY_PRODUCT_WAREHOUSE
} from "@/config/apiRoutes";

export const WarehousesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCity: builder.query({
            query: (data) => ({url: 'warehouses/get-city', method: 'post', data: data}),
        }),
        getWarehouses: builder.query({
            query: () => ({url: 'warehouses/user', method: 'get'}),
            providesTags: () => [{
                type: 'Warehouses'
            }]
        }),
        getDaysOfWeek: builder.query({
            query: () => ({url: GET_DAYS_WEEK, method: 'get'}),
            providesTags: () => [{
                type: 'DaysOfWeek'
            }]
        }),
        getWarehouse: builder.query({
            query: (id) => ({url: GET_WAREHOUSE, method: 'post', data: {'warehouse_id': id}}),
            providesTags: () => [{
                type: 'Warehouse'
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
        }),
        getCitiesWarehouse: builder.query({
            query: () => ({url: 'warehouses/get-cities', method: 'get'}),
        }),


        createWarehouse: builder.mutation({
            query: (data) => ({url: 'warehouses/warehouse', method: 'post', data: data}),
            invalidatesTags: ['Warehouses', 'MenuItems'],
        }),
        updateWarehouse: builder.mutation({
            query: (data) => ({url: 'warehouses/warehouse/update', method: 'post', data: data}),
            invalidatesTags: ['Warehouses', 'MenuItems'],
        }),
        deleteWarehouse: builder.mutation({
            query: (id) => ({url: 'warehouses/warehouse/delete', method: 'post', data: {id: id}}),
            invalidatesTags: ['Warehouses', 'MenuItems'],
        })
    })
})

export const {
    useGetCityQuery,
    useGetWarehousesQuery,
    useGetDaysOfWeekQuery,
    useGetWarehouseQuery,
    useCreateWarehouseMutation,
    useUpdateWarehouseMutation,
    useDeleteWarehouseMutation,
    useGetCitiesWarehouseQuery,
    useAddPriceWarehouseProductMutation,
    useAddQtyWarehouseProductMutation
} = WarehousesApi;