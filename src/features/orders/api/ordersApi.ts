import {api} from "@/store/apiSlice";

export const OrdersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchSupplierOrderNumbers: builder.query({
            query: () => ({
                url: '/supplier/orders',
                method: 'GET'
            }),
            providesTags: () => [{
                type: 'SupplierOrderNumbers'
            }],
        }),

        fetchSupplierOrderDetails: builder.query({
            query: (id) => ({
                url: `/supplier/orders/${id}`,
                method: 'GET'
            }),
            providesTags: () => [{
                type: 'SupplierOrderDetails'
            }],
        }),

        supplierUpdateOrderStatus: builder.mutation({
            query: ({id, status_id}) => ({
                url: `/supplier/orders/${id}/status`,
                method: 'POST',
                data: {status_id}
            }),
            invalidatesTags: () => [
                {type: 'SupplierOrderNumbers'},
                {type: 'SupplierOrderDetails'},
            ]
        }),

        fetchAllOrdersForClient: builder.query({
            query: (data) => ({
                url: '/webapp/orders',
                method: 'POST',
                data: data
            }),
            providesTags: () => [{
                type: 'ClientAllOrders'
            }],
        }),
    })
});

export const {
    useFetchSupplierOrderNumbersQuery,
    useLazyFetchSupplierOrderDetailsQuery,
    useSupplierUpdateOrderStatusMutation,
    useFetchAllOrdersForClient,
} = OrdersApi;