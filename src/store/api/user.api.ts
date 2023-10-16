import {api} from "@/store/api/api";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({url: 'user', method: 'get'})
        })
    })
})

export const {useGetUserQuery} = userApi