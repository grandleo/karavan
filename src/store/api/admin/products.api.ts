import {api} from "@/store/api/api";
import {
    ADMIN_GET_PRODUCTS,
    ADMIN_PRODUCT_CREATE, SUPPLIER_GET_ALL_PRODUCTS
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
        getAllProducts: builder.query({
            query: () => ({url: SUPPLIER_GET_ALL_PRODUCTS, method: 'get'}),
            providesTags: () => [{
                type: 'Products'
            }]
        }),
    })
})

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useGetAllProductsQuery,
} = productsApi;