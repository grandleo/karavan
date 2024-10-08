import {api} from "@/store/apiSlice";


export const stockClientApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStock: builder.query({
            query: (data) => ({url: 'client/stock', method: 'post', data: data}),
            providesTags: () => [{
                type: 'StockClient'
            }]
        }),
        getStockCategories: builder.query({
            query: () => ({url: 'client/stock/fetch-current-categories', method: 'get'}),
            providesTags: () => [{
                type: 'StockClientCategories'
            }]
        }),
        getStockProducts: builder.query({
            query: (id) => ({url: 'client/stock/fetch-current-products', method: 'post', data: {'category_id': id}}),
            providesTags: () => [{
                type: 'StockClient'
            }],
            async onCacheEntryAdded(data, { dispatch }) {
                echo.channel('Stock').listen('UpdateStockEvent', (data) => {
                    dispatch(api.util?.invalidateTags(['StockClient']))
                });
            }
        }),
    })
})

export const {
    useGetStockCategoriesQuery,
    useGetStockProductsQuery
} = stockClientApi;