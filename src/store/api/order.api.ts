import {api} from "@/store/api/api";

const OrderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({url: 'client/orders', method: 'get'}),
            providesTags: () => [{
                type: 'Orders'
            }]
        }),
        getOrder: builder.query({
            query: (number_id) => ({url: 'client/orders/get-order', method: 'post', data: {'number_id': number_id}}),
            providesTags: () => [{
                type: 'Order'
            }]
        }),
        changeStatus: builder.mutation({
            query: (number_id) => ({url: 'client/orders/change-status', method: 'post', data: {'number_id': number_id}}),
            invalidatesTags: () => [{
                type: 'Order'
            }]
        })

    })
})

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useChangeStatusMutation
} = OrderApi;