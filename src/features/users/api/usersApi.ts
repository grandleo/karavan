import {api} from "@/store/apiSlice";

export const UsersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchClientsByBotId: builder.query({
            query: (bot_id)=> ({
                url: '/supplier/clients/by-bot-id',
                method: 'POST',
                data: {bot_id: bot_id}
            }),
            providesTags: () => [{
                type: 'SupplierClients'
            }]
        }),
        updateSupplierClientStatus: builder.mutation({
            query: (data)=> ({
                url: '/supplier/clients/update-status',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'SupplierClients'
            }]
        })
    })
});

export const {
    useLazyFetchClientsByBotIdQuery,
    useUpdateSupplierClientStatusMutation
} = UsersApi;