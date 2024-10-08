import {api} from "@/store/apiSlice";


export const CartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({url: 'client/order/get-cart', method: 'get'}),
            providesTags: () => [{
                type: 'Cart'
            }]
        }),
        buyProduct: builder.mutation({
            query: (data) => ({url: 'client/order/create', method: 'post', data: data}),
            invalidatesTags: () => ['Cart', 'StockClient'],
        }),
    })
})

export const {
    useGetCartQuery,
    useBuyProductMutation
} = CartApi;