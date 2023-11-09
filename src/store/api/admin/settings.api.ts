import {api} from "@/store/api/api";

export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchPercents: builder.query({
            query: () => ({url: 'admin/settings/percents', method: 'get'}),
        }),
        setPercent: builder.mutation({
            query: (data) => ({url: 'admin/settings/percents/set-percent', method: 'post', data: data}),
        })
    })
})

export const {
    useFetchPercentsQuery,
    useSetPercentMutation,
} = settingsApi;