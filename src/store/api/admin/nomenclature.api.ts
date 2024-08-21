import {api} from "@/store/api/api";

export const nomenclatureApi = api.injectEndpoints({
    endpoints: (builder) => ({
        //Работа с категориями
        getCategories: builder.query({
            query: () => ({url: 'admin/settings/nomenclature/categories', method: 'get'}),
            providesTags: () => [{
                type: 'NomenclatureCategories'
            }]
        }),
        createCategory: builder.mutation({
            query: (data) => ({url: 'admin/settings/nomenclature/categories/create', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'NomenclatureCategories'
            }]
        }),
        updateCategory: builder.mutation({
            query: (data) => ({url: 'admin/settings/nomenclature/categories/update', method: 'post', data: data}),
            invalidatesTags: ['NomenclatureCategories', 'NomenclatureProducts'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({url: 'admin/settings/nomenclature/categories/delete', method: 'post', data: {id: id}}),
            invalidatesTags: ['NomenclatureCategories', 'NomenclatureProducts'],
        }),
        sortingCategories: builder.mutation({
            query: (data) => ({url: 'admin/settings/nomenclature/categories/sorting', method: 'post', data: {new_sort: data}}),
            invalidatesTags: () => [{
                type: 'NomenclatureCategories'
            }]
        }),
        //Работа с товарами
        getProductsByCategory: builder.query({
            query: (id) => ({url: 'admin/settings/nomenclature/products', method: 'post', data: {category_id: id}}),
            providesTags: () => [{
                type: 'NomenclatureProducts'
            }]
        }),
        createProduct: builder.mutation({
            query: (data) => ({url: 'admin/settings/nomenclature/products/create', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'NomenclatureProducts'
            }]
        }),
        updateProduct: builder.mutation({
            query: (data) => ({url: 'admin/settings/nomenclature/products/update', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'NomenclatureProducts'
            }]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({url: 'admin/settings/nomenclature/products/delete', method: 'post', data: {id: id}}),
            invalidatesTags: () => [{
                type: 'NomenclatureProducts'
            }]
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useSortingCategoriesMutation,
    useGetProductsByCategoryQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = nomenclatureApi