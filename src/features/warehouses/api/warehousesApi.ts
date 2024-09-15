import {api} from "@/store/api/api";

export const WarehousesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchWarehouses: builder.query({
            query: () => ({url: 'warehouses/user', method: 'get'}),
            providesTags: () => [{
                type: 'Warehouses'
            }]
        }),
    })
});

export const {
    useFetchWarehousesQuery,
} = WarehousesApi;