import {api} from "@/store/apiSlice";


export const stockSupplierApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchSupplierStock: builder.query({
            query: (data) => ({url: 'supplier/stock', method: 'post', data: data}),
            providesTags: () => [{
                type: 'SupplierStock'
            }],
        }),
        getCategoriesWithProducts: builder.query({
            query: () => ({
                url: 'supplier/stock/get-categories-with-products',
                method: 'get',
            })
        }),
        getSubCategoriesWithProducts: builder.query({
            query: (id) => ({
                url: 'supplier/stock/get-subcategories-with-products',
                method: 'post',
                data: { parent_id: id }
            })
        }),
        getCategoryProducts: builder.query({
            query: (id) => ({
                url: 'supplier/stock/get-category-products',
                method: 'post',
                data: { category_id: id }
            })
        }),
        addProductToSupplierStock: builder.mutation({
            query: (data) => ({url: 'supplier/stock/add-product', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'SupplierStock'
            }]
        }),
        updateProductToSupplierStock: builder.mutation({
            query: (data) => ({url: 'supplier/stock/update-product', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'SupplierStock'
            }]
        }),
        //Ниже старый код.
        getStockSupplier: builder.query({
            query: (dataQ) => ({url: 'supplier/stock', method: 'post', data: dataQ}),
            providesTags: () => [{
                type: 'StockSupplier'
            }],
        }),
        getCategoriesForSupplierStock: builder.query({
            query: () => ({url: 'supplier/stock/add/get-categories', method: 'get'}),
            providesTags: () => [{
                type: 'AddStockCategories'
            }]
        }),
        getCategoryProductsForSupplierStock: builder.query({
            query: (data) => ({url: 'supplier/stock/add/get-category-products', method: 'post', data: data}),
            providesTags: () => [{
                type: 'AddStockProducts'
            }]
        }),
        addProductForSupplierStock: builder.mutation({
            query: (data) => ({url: 'supplier/stock/add', method: 'post', data: data}),
            invalidatesTags: () => [{
                type: 'StockSupplier'
            }]
        }),

        fetchP2pBids: builder.query({
            query: (data) => ({
                url: 'supplier/stock/fetch-p2p-bids',
                method: 'POST',
                data: data
            }),
            providesTags: () => [{
                type: 'P2pBids'
            }]
        }),

        approveP2pBid: builder.mutation({
            query: (data) => ({
                url: 'supplier/stock/approve-p2p-bid',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'P2pBids'
            }]
        }),

        addMyP2pBid: builder.mutation({
            query: (data) => ({
                url: 'supplier/stock/add-my-p2p-bid',
                method: 'POST',
                data: data
            }),
            invalidatesTags: () => [{
                type: 'P2pBids'
            }]
        }),
    }),
})

export const {
    useFetchSupplierStockQuery,
    useGetCategoriesWithProductsQuery,
    useLazyGetSubCategoriesWithProductsQuery,
    useLazyGetCategoryProductsQuery,
    useAddProductToSupplierStockMutation,
    useUpdateProductToSupplierStockMutation,

    useLazyFetchP2pBidsQuery,
    useApproveP2pBidMutation,
    useAddMyP2pBidMutation,

    useGetStockSupplierQuery,
    useGetCategoriesForSupplierStockQuery,
    useGetCategoryProductsForSupplierStockQuery,
    useAddProductForSupplierStockMutation
} = stockSupplierApi