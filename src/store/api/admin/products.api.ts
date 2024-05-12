import {api} from "@/store/api/api";
import {
    ADMIN_GET_PRODUCTS,
    ADMIN_PRODUCT_CREATE, ADMIN_PRODUCT_DELETE, SUPPLIER_GET_ALL_PRODUCTS
} from "@/config/apiRoutes";

export const productsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (category_id?) => ({url: ADMIN_GET_PRODUCTS, method: 'post', data: {'category_id': category_id}}),
            providesTags: () => [{
                type: 'Products'
            }]
        }),
        getProduct: builder.query({
            query: (product_id?) => ({url: 'admin/products/get-product', method: 'post', data: {'product_id': product_id}}),

        }),
        createProduct: builder.mutation({
            query: (data) => ({url: 'admin/products/create', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Products'
            }]
        }),
        updateProduct: builder.mutation({
            query: (data) => ({url: 'admin/products/update', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Products'
            }]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({url: ADMIN_PRODUCT_DELETE, method: 'post', data: {'id': id}}),
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
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetAllProductsQuery,
    useDeleteProductMutation
} = productsApi;