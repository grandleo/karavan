import {api} from "@/store/api/api";
import {
    CREATE_WAREHOUSE_USER,
    GET_WAREHOUSES_USER
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
        })
    })
})

export const {
    useGetWarehousesQuery,
    useCreateWarehouseMutation
} = WarehousesApi;