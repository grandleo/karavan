import {api} from "@/store/api/api";

interface Warehouse {
    id: number;
    address: string;
}

interface ApiBot {
    id: number;
    name: string;
    token: string;
    username_support: string;
    username_bot: string;
    warehouses: Warehouse[];
}

interface TransformedWarehouse {
    value: string;
    label: string;
}

interface TransformedApiBot {
    id: number;
    name: string;
    token: string;
    username_support: string;
    username_bot: string;
    warehouses: TransformedWarehouse[];
}

export const BotsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBotsApi: builder.query<TransformedApiBot[], void>({
            query: () => ({ url: 'bots', method: 'get' }),
            transformResponse: (response: ApiBot[]): TransformedApiBot[] => {
                return response.map(bot => ({
                    ...bot,
                    warehouses: bot.warehouses.map(warehouse => ({
                        value: String(warehouse.id),
                        label: warehouse.address
                    }))
                }));
            },
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
        }),
        toggleActiveBotApi: builder.mutation({
            query: (data) => ({url: 'bots/toggle-active', method: 'post', data: data}),
            invalidatesTags: ['UserBotsApi'],
        }),
    })
})

export const {
    useGetBotsApiQuery,
    useCreateBotApiMutation,
    useUpdateBotApiMutation,
    useDeleteBotApiMutation,
    useToggleActiveBotApiMutation
} = BotsApi;