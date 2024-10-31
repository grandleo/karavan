import {api} from "@/store/apiSlice";

export const MenuItemsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchMenuItems: builder.query({
            query: ()=> ({
                url: '/get-menu-items',
                method: 'GET'
            }),
            providesTags: () => [{
                type: 'MenuItems'
            }]
        })
    })
});

export const {
    useFetchMenuItemsQuery
} = MenuItemsApi;