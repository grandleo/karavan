import {api} from "@/store/api/api";
import {
    ADMIN_CREATE_SPECIFICATION_CREATE,
    ADMIN_CREATE_SPECIFICATION_DELETE,
    ADMIN_CREATE_SPECIFICATION_UPDATE,
    ADMIN_CREATE_SPECIFICATION_VALUES,
    ADMIN_DELETE_SPECIFICATION_VALUES,
    ADMIN_GET_SPECIFICATION_VALUES,
    ADMIN_GET_SPECIFICATIONS
} from "@/config/apiRoutes";

export const specificationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSpecifications: builder.query({
            query: () => ({url: ADMIN_GET_SPECIFICATIONS, method: 'get'}),
            providesTags: () => [{
                type: 'Specifications'
            }]
        }),
        createSpecification: builder.mutation({
            query: (data) => ({url: ADMIN_CREATE_SPECIFICATION_CREATE, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Specifications'
            }]
        }),
        updateSpecification: builder.mutation({
            query: (data) => ({url: ADMIN_CREATE_SPECIFICATION_UPDATE, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Specifications'
            }]
        }),
        deleteSpecification: builder.mutation({
            query: (id) => ({url: ADMIN_CREATE_SPECIFICATION_DELETE, method: 'post', data: {'id': id}}),
            invalidatesTags: () => [{
                type: 'Specifications'
            }]
        }),
        getSpecificationValues: builder.query({
            query: (id) => ({url: ADMIN_GET_SPECIFICATION_VALUES, method: 'post', data: {id_specification: id}}),
            providesTags: () => [{
                type: 'SpecificationValues'
            }]
        }),
        addSpecificationValues: builder.mutation({
            query: (data) => ({url: ADMIN_CREATE_SPECIFICATION_VALUES, method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'SpecificationValues'
            }]
        }),
        deleteSpecificationValue: builder.mutation({
            query: (id) => ({url: ADMIN_DELETE_SPECIFICATION_VALUES, method: 'post', data: {'id': id}}),
            invalidatesTags: () => [{
                type: 'SpecificationValues'
            }]
        }),
    })
});

export const {
    useGetSpecificationsQuery,
    useCreateSpecificationMutation,
    useDeleteSpecificationMutation,
    useUpdateSpecificationMutation,
    useGetSpecificationValuesQuery,
    useAddSpecificationValuesMutation,
    useDeleteSpecificationValueMutation
} = specificationsApi;