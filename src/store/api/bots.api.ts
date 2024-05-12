import {api} from "@/store/api/api";

export const BotsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBotsApi: builder.query({
            query: (data) => ({url: 'bots', method: 'get'}),
            providesTags: () => [{
                type: 'UserBotsApi'
            }]
        }),
        createBotApi: builder.mutation({
            query: (data) => ({url: 'bots', method: 'post', data: data}),
            invalidatesTags: ['UserBotsApi'],
        }),
        updateBotApi: builder.mutation({
            query: (data) => ({url: 'bots/update', method: 'post', data: data}),
            invalidatesTags: ['UserBotsApi'],
        }),
        deleteBotApi: builder.mutation({
            query: (id) => ({url: 'bots/delete', method: 'post', data: {id: id}}),
            invalidatesTags: ['UserBotsApi'],
        })
    })
})

export const {
    useGetBotsApiQuery,
    useCreateBotApiMutation,
    useUpdateBotApiMutation,
    useDeleteBotApiMutation
} = BotsApi;