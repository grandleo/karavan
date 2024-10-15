import {api} from "@/store/apiSlice";

export const ApiBotsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Получение списка ApiBots
        fetchApiBots: builder.query({
            query: ()=> ({
                url: '/supplier/bots',
                method: 'GET'
            }),
            providesTags: () => [{
                type: 'ApiBots'
            }]
        }),

        // Получение ApiBot
        fetchApiBot: builder.query({
           query: (id) => ({
               url: `/supplier/bots/${id}`,
               method: 'GET',
           })
        }),

        // Создание нового ApiBot
        createApiBot: builder.mutation({
            query: (data) => ({
                url: '/supplier/bots/create',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'ApiBots'
            }]
        }),

        // Обновление существующего ApiBot
        updateApiBot: builder.mutation({
            query: (data) => ({
                url: '/supplier/bots/update',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'ApiBots'
            }]
        }),

        // Удаление ApiBot
        deleteApiBot: builder.mutation({
            query: (data) => ({
                url: '/supplier/bots/delete',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'ApiBots'
            }]
        }),

        // Включение отключение ApiBot
        toggleApiBot: builder.mutation({
            query: (id) => ({
                url: '/supplier/bots/toggle-active',
                method: 'POST',
                data: {id: id}
            }),
            invalidatesTags: () => [{
                type: 'ApiBots'
            }]
        }),
    })
});

export const {
    useFetchApiBotsQuery,
    useLazyFetchApiBotQuery,
    useCreateApiBotMutation,
    useUpdateApiBotMutation,
    useDeleteApiBotMutation,
    useToggleApiBotMutation
} = ApiBotsApi;