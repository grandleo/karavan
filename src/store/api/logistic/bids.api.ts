import {api} from "@/store/apiSlice";


export const bidsLogisticApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addBid: builder.mutation({
            query: (data) => ({url: 'logistic/bids/add', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'LogisticOrders'
            }]
        }),
        removeBid: builder.mutation({
            query: (data) => ({url: 'logistic/bids/remove', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'LogisticOrders'
            }]
        }),
        approveBid: builder.mutation({
            query: (data) => ({url: 'client/orders/approve-bid', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Order'
            }]
        }),
    })
})

export const {
    useAddBidMutation,
    useRemoveBidMutation,
    useApproveBidMutation
} = bidsLogisticApi