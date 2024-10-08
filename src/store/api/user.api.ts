import {api} from "@/store/apiSlice";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({url: 'user', method: 'get'}),
            providesTags: () => [{
                type: 'UserInfo'
            }]
        }),
        uploadAvatar: builder.mutation({
            query: (data) => ({url: 'user/upload-avatar', method: 'post', data: data}),
            invalidatesTags: ['UserInfo'],
        }),
    })
})

export const {
    useGetUserQuery,
    useUploadAvatarMutation
} = userApi