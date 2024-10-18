import {api} from "@/store/apiSlice";


export const StatusesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchOrderStatuses: builder.query({
            query: () => ({
                url: 'admin/settings/statuses',
                method: 'get'
            }),
            providesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        fetchStatusById: builder.query({
            query: (id) => ({
                url: 'admin/settings/statuses/by-id',
                method: 'post',
                data: {id: id}
            }),
            providesTags: () => [{
                type: 'OrderStatus'
            }]
        }),
        createOrderStatus: builder.mutation({
            query: (data) => ({
                url: 'admin/settings/statuses/create',
                method: 'post',
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }),
            invalidatesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        updateOrderStatus: builder.mutation({
            query: (data) => ({
                url: 'admin/settings/statuses/update',
                method: 'post',
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }),
            invalidatesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
        deleteOrderStatus: builder.mutation({
            query: (data) => ({
                url: 'admin/settings/statuses/delete',
                method: 'post',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'OrderStatuses'
            }]
        }),
    })
});

export const {
    useFetchOrderStatusesQuery,
    useFetchStatusByIdQuery,
    useCreateOrderStatusMutation,
    useUpdateOrderStatusMutation,
    useDeleteOrderStatusMutation,
} = StatusesApi;