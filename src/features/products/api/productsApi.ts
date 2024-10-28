import {api} from "@/store/apiSlice";

const ProductsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchProductsByCategoryId: builder.query({
            query: ({ category_id }) => {
                // Создаем объект параметров
                const params = { category_id };

                return {
                    url: '/admin/products/fetch-products-by-category-id',
                    method: 'GET',
                    params,
                };
            },
            providesTags: () => [{
                type: 'Products'
            }],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: '/admin/products/store',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'Products'
            }]
        }),
        updateProduct: builder.mutation({
            query: ({id, ...data}) => ({
                url: `/admin/products/${id}/update`,
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'Products'
            }]
        }),
        fetchProductFormData: builder.query({
            query: (id) => {
                // Создаем объект параметров
                const params = { id: id };

                return {
                    url: '/admin/products/fetch-form-data',
                    method: 'GET',
                    params,
                };
            },
        }),
    })
});

export const {
    useLazyFetchProductsByCategoryIdQuery,
    useLazyFetchProductFormDataQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
} = ProductsApi;