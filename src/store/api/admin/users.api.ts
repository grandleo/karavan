import {api} from "@/store/apiSlice";


export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (data) => ({url: 'admin/get-users', method: 'post', data: data}),
            providesTags: () => [{
                type: 'Users'
            }]
        }),
        getUserForm: builder.query({
            query: (id) => ({url: 'admin/users/get-user', method: 'post', data: {id: id}}),
        }),
        updateUser: builder.mutation( {
            query: (data) => ({url: 'admin/users/update-user', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Users'
            }]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({url: 'admin/users/delete', method: 'post', data: {'user_id': id}}),
            invalidatesTags: () => [{
                type: 'Users'
            }]
        }),
        getAdminUser: builder.query({
            query: (id) => ({url: 'admin/users/get-admin', method: 'post', data: {id: id}}),
        }),
        addAdminUser: builder.mutation( {
            query: (data) => ({url: 'admin/users/add-admin', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Users'
            }]
        }),
        updateAdminUser: builder.mutation( {
            query: (data) => ({url: 'admin/users/update-admin', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Users'
            }]
        }),
        getUserStatuses: builder.query({
            query: () => ({url: 'admin/user-statuses', method: 'get'}),
            providesTags: ['UserStatuses'],
        }),
        changeUserStatus: builder.mutation({
            query: (data) => ({url: 'admin/users/change-status', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'Users'
            }]
        }),
        getUserVerifyInfo: builder.query({
            query: (id) => ({url: 'admin/users/get-verify-info', method: 'post', data: {user_id: id}}),
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetUserFormQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetAdminUserQuery,
    useAddAdminUserMutation,
    useUpdateAdminUserMutation,
    useGetUserStatusesQuery,
    useChangeUserStatusMutation,
    useGetUserVerifyInfoQuery
} = usersApi