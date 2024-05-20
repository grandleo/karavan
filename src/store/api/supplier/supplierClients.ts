import {api} from "@/store/api/api";

export const supplierClientsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSupplierClients: builder.query({
            query: (id) => ({url: 'supplier/clients', method: 'post', data: {id: id}}),
            providesTags: () => [{
                type: 'SupplierClients'
            }]
        }),
        changeSupplierClientStatus: builder.mutation({
            query: (data) => ({url: 'supplier/clients/change-status', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'SupplierClients'
            }]
        }),
    }),
})

export const {
    useGetSupplierClientsQuery,
    useChangeSupplierClientStatusMutation
} = supplierClientsApi;