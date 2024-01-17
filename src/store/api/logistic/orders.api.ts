import {api} from "@/store/api/api";
import echo from "@/config/laravel-echo";

export const ordersLogisticApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrdersForLogistic: builder.query({
            query: () => ({url: 'logistic/orders', method: 'get'}),
            providesTags: () => [{
                type: 'LogisticOrders'
            }],
            async onCacheEntryAdded(data, { dispatch }) {
                echo.channel('Orders').listen('UpdateOrdersEvent', (data: any) => {
                    dispatch(api.util?.invalidateTags(['LogisticOrders']))
                });
            }
        })
    })
})

export const {
    useGetOrdersForLogisticQuery,
} = ordersLogisticApi