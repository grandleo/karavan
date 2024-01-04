import {api} from "@/store/api/api";
import {IOrder} from "@/components/orders/types";
import EditQuantityProduct from "@/components/orders/form/EditQuantityProduct";
import echo from "@/config/laravel-echo";

const OrderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({url: 'client/orders', method: 'get'}),
            providesTags: () => [{
                type: 'Orders'
            }],
            async onCacheEntryAdded(data, { dispatch }) {
                echo.channel('Orders').listen('UpdateOrdersEvent', (data: any) => {
                    dispatch(api.util?.invalidateTags(['Orders']))
                });
            }
        }),
        getOrder: builder.query<IOrder, number>({
            query: (number_id) => ({url: 'client/orders/get-order', method: 'post', data: {'number_id': number_id}}),
            providesTags: () => [{
                type: 'Order'
            }],
            async onCacheEntryAdded(data, { dispatch }) {
                echo.channel('Order').listen('UpdateOrderEvent', (data: any) => {
                    dispatch(api.util?.invalidateTags(['Order']))
                });
            }
        }),
        changeStatus: builder.mutation({
            query: (number_id) => ({url: 'client/orders/change-status', method: 'post', data: {'number_id': number_id}}),
            invalidatesTags: () => [{
                type: 'Order'
            }]
        }),
        editOrder: builder.mutation({
            query: (data) => ({url: 'client/orders/edit-order', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Order'
            }]
        }),
        editQuantityProductOrder: builder.mutation({
            query: (data) => ({url: 'client/orders/edit-product', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Order'
            }]
        }),
        deleteProductOrder: builder.mutation({
            query: (product_id) => ({url: 'client/orders/delete-product', method: 'post', data: {'product_id': product_id}}),
            invalidatesTags: () => [{
                type: 'Order'
            }]
        }),

    })
})

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useChangeStatusMutation,
    useEditOrderMutation,
    useEditQuantityProductOrderMutation,
    useDeleteProductOrderMutation,
} = OrderApi;