import {api} from "@/store/api/api";
import {
    ADMIN_GET_CATEGORIES,
    ADMIN_GET_CATEGORIES_CREATE,
    ADMIN_GET_CATEGORIES_DELETE,
    ADMIN_GET_CATEGORIES_UPDATE
} from "@/config/apiRoutes";

export const categoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({url: ADMIN_GET_CATEGORIES, method: 'get'}),
            providesTags: () => [{
                type: 'Categories'
            }]
        }),
        createCategory: builder.mutation({
            query: (data) => ({url: ADMIN_GET_CATEGORIES_CREATE, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
        updateCategory: builder.mutation({
            query: (data) => ({url: ADMIN_GET_CATEGORIES_UPDATE, method: 'post', data: data}),
            invalidatesTags: () => ['Categories', 'CategorySpecifications']
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({url: ADMIN_GET_CATEGORIES_DELETE, method: 'post', data: {'id': id}}),
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
        getCategorySpecifications: builder.query({
            query: (id) => ({url: 'admin/categories/get-category-specifications', method: 'post', data: {'category_id': id}}),
            providesTags: () => [{
                type: 'CategorySpecifications'
            }]
        }),
        setSortingCategories: builder.mutation({
            query: (data) => ({url: 'admin/categories/set-sort', method: 'post', data: {'new_sort': data}}),
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategorySpecificationsQuery,
    useSetSortingCategoriesMutation
} = categoriesApi;