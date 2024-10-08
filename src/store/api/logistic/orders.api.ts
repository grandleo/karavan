import {api} from "@/store/apiSlice";


export const ordersLogisticApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrdersForLogistic: builder.query({
            query: () => ({url: 'logistic/orders', method: 'get'}),
            providesTags: () => [{
                type: 'LogisticOrders'
            }]
        })
    })
})

export const {
    useGetOrdersForLogisticQuery,
} = ordersLogisticApi