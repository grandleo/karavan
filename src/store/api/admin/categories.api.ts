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
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({url: ADMIN_GET_CATEGORIES_DELETE, method: 'post', data: {'id': id}}),
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
    })
})

export const {useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation} = categoriesApi;