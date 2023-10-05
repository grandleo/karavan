import {api} from "@/store/api/api";
import {
    ADMIN_CREATE_SPECIFICATION_CREATE,
    ADMIN_CREATE_SPECIFICATION_DELETE,
    ADMIN_CREATE_SPECIFICATION_UPDATE,
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
    })
});

export const {useGetSpecificationsQuery, useCreateSpecificationMutation, useDeleteSpecificationMutation, useUpdateSpecificationMutation} = specificationsApi;