import {api} from "@/store/apiSlice";

export const CurrenciesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchCurrencies: builder.query({
            query: ()=> ({
                url: '/admin/settings/currencies',
                method: 'GET'
            }),
            providesTags: () => [{
                type: 'Currencies'
            }]
        }),

        fetchCurrency: builder.query({
            query: (id)=> ({
                url: `/admin/settings/currencies/${id}`,
                method: 'GET'
            })
        }),

        createCurrency: builder.mutation({
            query: (data) => ({
                url: '/admin/settings/currencies/store',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'Currencies'
            }]
        }),

        updateCurrency: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/admin/settings/currencies/update/${id}`,
                method: 'POST',
                data: patch
            }),
            invalidatesTags: () => [{
                type: 'Currencies'
            }]
        }),

        deleteCurrency: builder.mutation({
            query: (id) => ({
                url: `/admin/settings/currencies/delete/${id}`,
                method: 'GET',
            }),
            invalidatesTags: () => [{
                type: 'Currencies'
            }]
        }),

        updateSortOrderCurrencies: builder.mutation({
            query: (data) => {
                return {
                    url: '/admin/settings/currencies/sort',
                    method: 'POST',
                    data: {ids: data}
                }
            },
            invalidatesTags: () => [{
                type: 'Currencies'
            }]
        }),
    })
});

export const {
    useFetchCurrenciesQuery,
    useLazyFetchCurrencyQuery,
    useCreateCurrencyMutation,
    useUpdateCurrencyMutation,
    useDeleteCurrencyMutation,
    useUpdateSortOrderCurrenciesMutation
} = CurrenciesApi;