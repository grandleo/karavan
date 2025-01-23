import {api} from "@/store/apiSlice";
import {BaseQueryArg} from "@reduxjs/toolkit/src/query/baseQueryTypes";

export const CategoriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchTreeCategories: builder.query({
            query: () => ({
                url: '/admin/categories/tree',
                method: 'GET'
            }),
            providesTags: () => [{
                type: 'Categories'
            }],
        }),
        fetchCategoriesById: builder.query({
            query: ({ category_id }) => {
                const params = { category_id };
                return {
                    url: '/admin/categories/fetch-by-id',
                    method: 'GET',
                    params,
                }
            },
        }),
        fetchFormData: builder.query({
            query: ({id}) => {
                // Формируем URL в зависимости от наличия id
                const url = id ? `/admin/categories/form-data/${id}` : `/admin/categories/form-data`;
                return {
                    url,
                    method: 'GET',
                };
            },
        }),
        createCategory: builder.mutation({
            query: (data) => {
                return {
                    url: '/admin/categories/store',
                    method: 'POST',
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            },
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
        updateCategory: builder.mutation({
            query: (data) => {
                return {
                    url: `/admin/categories/update/${data.get("id")}`, // Обновлённый URL для POST запроса
                    method: 'POST', // Изменён метод на POST
                    data: data,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            },
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
        deleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/categories/delete/${id}`,
                    method: 'GET',
                }
            },
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),
        fetchCategorySpecifications: builder.query({
            query: (id) => {
                const params = { category_id: id };
                return {
                    url: '/admin/categories/specifications',
                    method: 'GET',
                    params,
                }
            },
        }),
        fetchCategoryPath: builder.query({
            query: (id) => {
                const params = { category_id: id };
                return {
                    url: '/admin/categories/category-path',
                    method: 'GET',
                    params,
                }
            },
        }),
        updateSortOrder: builder.mutation({
            query: (data) => {
                return {
                    url: `/admin/categories/sort`,
                    method: 'POST',
                    data: {ids: data}
                }
            },
            invalidatesTags: () => [{
                type: 'Categories'
            }]
        }),

        fetchClientCategories: builder.query({
            query: (parent_id) => ({
                url: '/webapp/fetchCategories',
                method: 'GET',
                params: {
                    parent_id,
                },
            }),
        }),
    })
});

export const {
    useFetchTreeCategoriesQuery,
    useLazyFetchCategoriesByIdQuery,
    useLazyFetchFormDataQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useLazyFetchCategorySpecificationsQuery,
    useLazyFetchCategoryPathQuery,
    useUpdateSortOrderMutation,
    useLazyFetchClientCategoriesQuery,
} = CategoriesApi;