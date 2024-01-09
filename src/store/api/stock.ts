import {api} from "@/store/api/api";
import echo from "@/config/laravel-echo";

export const stockApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCityCategories: builder.query({
            query: (data) => ({url: 'stock/get-city-categories', method: 'post', data: {city_id: data}}),
        }),
        getProductsCityCategory: builder.query({
            query: (data) => ({url: 'stock/get-products-city-category', method: 'post', data: data}),
            providesTags: () => [{
                type: 'StockProductsCityCategory'
            }],
            async onCacheEntryAdded(data, { dispatch }) {
                echo.channel('Stock').listen('UpdateStockEvent', (data: any) => {
                    dispatch(api.util?.invalidateTags(['StockClient']))
                });
            }
        }),
    })
})

export const {
    useGetCityCategoriesQuery,
    useGetProductsCityCategoryQuery,
} = stockApi;