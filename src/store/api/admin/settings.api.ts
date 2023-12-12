import {api} from "@/store/api/api";

export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchPercents: builder.query({
            query: () => ({url: 'admin/settings/percents', method: 'get'}),
        }),
        setPercent: builder.mutation({
            query: (data) => ({url: 'admin/settings/percents/set-percent', method: 'post', data: data}),
        }),
        fetchOrderStatuses: builder.query({
            query: () => ({url: 'admin/settings/statuses', method: 'get'}),
            providesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        createOrderStatus: builder.mutation({
            query: (data) => ({url: 'admin/settings/statuses/create', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        updateOrderStatus: builder.mutation({
            query: (data) => ({url: 'admin/settings/statuses/update', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        deleteOrderStatus: builder.mutation({
            query: (data) => ({url: 'admin/settings/statuses/delete', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        sortingOrderStatuses: builder.mutation({
            query: (data) => ({url: 'admin/settings/statuses/sorting', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        fetchRoles: builder.query({
            query: () => ({url: 'admin/settings/menu/roles', method: 'get'}),
        }),
        fetchMenuForRole: builder.query({
            query: (id) => ({url: 'admin/settings/menu', method: 'post', data: {'role_id': id}}),
        }),
    })
})

export const {
    useFetchPercentsQuery,
    useSetPercentMutation,
    useFetchOrderStatusesQuery,
    useCreateOrderStatusMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderStatusMutation,
    useSortingOrderStatusesMutation,
    useFetchRolesQuery,
    useFetchMenuForRoleQuery
} = settingsApi;