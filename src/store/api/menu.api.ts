import {api} from "@/store/api/api";

export const menuApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({url: 'get-menu-items', method: 'get'}),
            providesTags: () => [{
                type: 'MenuItems'
            }]
        }),
    })
})

export const {
    useGetMenuItemsQuery,
} = menuApi