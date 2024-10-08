import {api} from "@/store/apiSlice";


export const menuApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({url: 'get-menu-items', method: 'GET'}),
            providesTags: () => [{
                type: 'MenuItems'
            }]
        }),
    })
})

export const {
    useGetMenuItemsQuery,
} = menuApi