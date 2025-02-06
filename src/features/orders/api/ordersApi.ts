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

        fetchClientOrderNumbers: builder.query({
            query: () => ({
                url: '/webapp/orders',
                method: 'GET'
            }),
            providesTags: () => [{
                type: 'ClientAllOrders'
            }],
        }),

        createOrder: builder.mutation({
            query: (data) => ({
                url: `/webapp/order`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [
                {type: 'ClientAllOrders'},
            ]
        }),

        // ✅ Методы для администратора (новые)
        fetchAdminOrderNumbers: builder.query({
            query: () => ({
                url: '/admin/orders', // Новый эндпоинт для админа
                method: 'GET'
            }),
            providesTags: () => [{ type: 'AdminOrderNumbers' }],
        }),

        fetchAdminOrderDetails: builder.query({
            query: (id) => ({
                url: `/admin/orders/${id}`,
                method: 'GET'
            }),
            providesTags: () => [{ type: 'AdminOrderDetails' }],
        }),

        adminUpdateOrderStatus: builder.mutation({
            query: ({ id, status_id }) => ({
                url: `/admin/orders/${id}/status`,
                method: 'POST',
                data: { status_id }
            }),
            invalidatesTags: () => [
                { type: 'AdminOrderNumbers' },
                { type: 'AdminOrderDetails' },
            ]
        }),
    })
});

export const {
    useFetchSupplierOrderNumbersQuery,
    useLazyFetchSupplierOrderDetailsQuery,
    useSupplierUpdateOrderStatusMutation,
    useFetchClientOrderNumbersQuery,
    useCreateOrderMutation,

    useFetchAdminOrderNumbersQuery,
    useLazyFetchAdminOrderDetailsQuery,
    useAdminUpdateOrderStatusMutation
} = OrdersApi;