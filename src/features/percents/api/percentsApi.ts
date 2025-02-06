import {api} from "@/store/apiSlice";

const PercentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchPercents: builder.query({
            query: () => {
                return {
                    url: '/admin/settings/percents',
                    method: 'GET',
                };
            },
            providesTags: () => [{
                type: 'Percents'
            }],
        }),
        updatePercent: builder.mutation({
            query: ({ id, percent }) => ({
                url: `/admin/settings/percents/update`,
                method: 'POST',
                data: { id, percent },
            }),
            invalidatesTags: ['Percents'],
        }),
    })
});

export const {
    useFetchPercentsQuery,
    useUpdatePercentMutation
} = PercentsApi;