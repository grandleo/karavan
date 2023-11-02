import {api} from "@/store/api/api";

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (role) => ({url: 'admin/get-users', method: 'post', data: {'role': role}}),
            providesTags: () => [{
                type: 'Users'
            }]
        }),
    })
})

export const {
    useGetUsersQuery,
} = usersApi