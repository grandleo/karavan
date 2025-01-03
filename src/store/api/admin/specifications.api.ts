import {api} from "@/store/apiSlice";


export const specificationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProductSpecifications: builder.query({
            query: () => ({url: 'admin/specifications', method: 'get'}),
            providesTags: () => [{
                type: 'Specifications'
            }]
        }),
        createSpecification: builder.mutation({
            query: (data) => ({url: 'admin/specifications/create', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Specifications'
            }]
        }),
        updateSpecification: builder.mutation({
            query: (data) => ({url: 'admin/specifications/update', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Specifications'
            }]
        }),
        deleteSpecification: builder.mutation({
            query: (id) => ({url: 'admin/specifications/delete', method: 'post', data: {'id': id}}),
            invalidatesTags: () => [{
                type: 'Specifications'
            }]
        }),
        setSortSpecification: builder.mutation({
            query: (data) => ({url: 'admin/specifications/set-sort', method: 'post', data: {'new_sort': data}}),
            invalidatesTags: () => [{
                type: 'Specifications'
            }]
        }),













        getSpecifications: builder.query({
            query: () => ({url: 'admin/specifications', method: 'get'}),
            providesTags: () => [{
                type: 'Specifications'
            }]
        }),
        getSpecification: builder.query({
            query: (data) => ({url: 'admin/specifications/get-specification', method: 'post', data: {id: data}})
        }),
        getSpecificationValues: builder.query({
            query: (id) => ({url: 'admin/specifications/get-values', method: 'post', data: {id_specification: id}}),
            providesTags: () => [{
                type: 'SpecificationValues'
            }]
        }),
        addSpecificationValues: builder.mutation({
            query: (data) => ({url: 'admin/specifications/add-values', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'SpecificationValues'
            }]
        }),
        deleteSpecificationValue: builder.mutation({
            query: (id) => ({url: 'admin/specifications/delete-value', method: 'post', data: {'id': id}}),
            invalidatesTags: () => [{
                type: 'SpecificationValues'
            }]
        })
    })
});

export const {
    useGetProductSpecificationsQuery,
    useCreateSpecificationMutation,
    useUpdateSpecificationMutation,
    useDeleteSpecificationMutation,
    useSetSortSpecificationMutation,




    useGetSpecificationsQuery,
    useGetSpecificationValuesQuery,
    useAddSpecificationValuesMutation,
    useDeleteSpecificationValueMutation,
} = specificationsApi;