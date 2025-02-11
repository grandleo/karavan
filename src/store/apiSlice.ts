import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/store/axiosBaseQuery";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    tagTypes: [
        'ApiBots',
        'Warehouses',
        'WarehouseFormData',
        'SupplierClients',
        'SupplierOrderNumbers',
        'SupplierOrderDetails',
        'AdminOrderNumbers',
        'AdminOrderDetails',
        'Currencies',
        'P2pBids',
        'Percents',

        //webApp
        'ClientAllOrders',





        'User',
        'Users',
        'MenuItems',
        'Specifications',
        'SpecificationValues',
        'Categories',
        'CategorySpecifications',
        'Products',
        'Warehouse',
        'DaysOfWeek',
        'AddStockCategories',
        'AddStockProducts',
        'StockSupplier',
        'StockClient',
        'StockClientCategories',
        'Cart',
        'Orders',
        'Order',
        'OrderStatuses',
        'LogisticOrders',
        'StockProductsCityCategory',
        'UserStatuses',
        'ProducerCountries',
        //Оптимизировано
        'UserBotsApi',
        'SupplierStock',
        'UserInfo',
        'NomenclatureCategories',
        'NomenclatureProducts',
        'OrderStatus',
    ],
    endpoints: (builder) => ({

    }),
});