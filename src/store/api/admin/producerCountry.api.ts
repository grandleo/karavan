import {api} from "@/store/api/api";

export const producerCountryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducerCountries: builder.query({
            query: () => ({url: 'admin/settings/producer-countries', method: 'get'}),
            providesTags: () => [{
                type: 'ProducerCountries'
            }]
        }),
        addProducerCountry: builder.mutation({
            query: (data) => ({
                url: 'admin/settings/producer-countries/add', method: 'post', data: data, headers: {
                    "Content-Type": "multipart/form-data",
                }
            }),
            invalidatesTags: () => [{
                type: 'ProducerCountries'
            }]
        }),
        updateProducerCountry: builder.mutation({
            query: (data) => ({
                url: 'admin/settings/producer-countries/update', method: 'post', data: data, headers: {
                    "Content-Type": "multipart/form-data",
                }
            }),
            invalidatesTags: () => [{
                type: 'ProducerCountries'
            }]
        }),
        deleteProducerCountry: builder.mutation({
            query: (id) => ({url: 'admin/settings/producer-countries/delete', method: 'post', data: {id: id}}),
            invalidatesTags: () => [{
                type: 'ProducerCountries'
            }]
        }),
        setSortProducerCountry: builder.mutation({
            query: (data) => ({
                url: 'admin/settings/producer-countries/set-sort',
                method: 'post',
                data: {new_sort: data}
            }),
            invalidatesTags: () => [{
                type: 'ProducerCountries'
            }]
        }),
    })
})

export const {
    useGetProducerCountriesQuery,
    useAddProducerCountryMutation,
    useUpdateProducerCountryMutation,
    useDeleteProducerCountryMutation,
    useSetSortProducerCountryMutation

} = producerCountryApi;