import {api} from "@/store/apiSlice";


export const WarehousesApi = api.injectEndpoints({
    endpoints: (builder) => ({

        // Получения всех складов пользователя
        fetchWarehouses: builder.query({
            query: () => ({url: 'warehouses', method: 'GET'}),
            providesTags: () => [{
                type: 'Warehouses'
            }]
        }),

        // Получение данных для формы добавления/редактирования
        fetchWarehouseFormData: builder.query({
            query: () => ({
                url: 'warehouses/form-data',
                method: 'GET',
            }),
            providesTags: () => [{ type: 'WarehouseFormData' }],
        }),

        // Получение данных одного склада по ID
        fetchWarehouseById: builder.query({
            query: (id) => ({
                url: `warehouses/${id}`,
                method: 'GET',
            }),
        }),

        // Добавление нового склада
        addWarehouse: builder.mutation({
            query: (data) => ({
                url: 'warehouses/create',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: () => [{
                type: 'Warehouses'
            }]
        }),

        // Редактирование существующего склада
        editWarehouse: builder.mutation({
            query: (data) => ({
                url: `warehouses/update`,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: () => [{
                type: 'Warehouses'
            }]
        }),

        // Удаление склада
        deleteWarehouse: builder.mutation({
            query: (id) => ({
                url: `warehouses/delete`,
                method: 'POST',
                data: {id: id}
            }),
            invalidatesTags: () => [{
                type: 'Warehouses'
            }]
        }),

    })
});

export const {
    useFetchWarehousesQuery,
    useLazyFetchWarehousesQuery,
    useLazyFetchWarehouseFormDataQuery,
    useLazyFetchWarehouseByIdQuery,
    useAddWarehouseMutation,
    useEditWarehouseMutation,
    useDeleteWarehouseMutation,
} = WarehousesApi;