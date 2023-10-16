import {api} from "@/store/api/api";
import {
    ADMIN_GET_PRODUCTS,
    ADMIN_PRODUCT_CREATE
} from "@/config/apiRoutes";

export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (category_id?) => ({url: ADMIN_GET_PRODUCTS, method: 'post', data: {'category_id': category_id}}),
            providesTags: () => [{
                type: 'Products'
            }]
        }),
        createProduct: builder.mutation({
            query: (data) => ({url: ADMIN_PRODUCT_CREATE, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Products'
            }]
        }),
    })
})

export const {
    useGetProductsQuery,
    useCreateProductMutation,
} = productsApi;