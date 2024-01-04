import {api} from "@/store/api/api";

export const stockApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCityCategories: builder.query({
            query: (data) => ({url: 'stock/get-city-categories', method: 'post', data: {city_id: data}}),
        }),
        getProductsCityCategory: builder.query({
            query: (data) => ({url: 'stock/get-products-city-category', method: 'post', data: data}),
        }),
    })
})

export const {
    useGetCityCategoriesQuery,
    useGetProductsCityCategoryQuery,
} = stockApi;