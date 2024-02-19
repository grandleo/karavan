'use client'

import {useParams} from "next/navigation";
import {Box, Flex, ScrollArea} from "@mantine/core";
import SimplePage from "../simplePage";
import CategoriesTree from "@/components/CategoriesTree";
import {useGetCityCategoriesQuery} from "@/store/api/stock";
import classes from "./client-stock.module.css";
import ProductsClientStock from "@/components/client-stock/ui/ProductsClientStock";
import {useGetCityQuery, useGetWarehousesQuery} from "@/store/api/warehouses.api";
import SelectWarehouse from "@/components/client-stock/ui/SelectWarehouse";
import {EmptyStock} from "@/components/client-stock/ui/DataEmpty";
import Cart from "@/components/ui/Cart/Cart";

const ClientStock = () => {
    const {id} = useParams<{ id: string; }>();
    const {data: city, isLoading: isLoadingCity} = useGetCityQuery({id: id});
    const {data: warehouses, isLoading: isLoadingWarehouses} = useGetWarehousesQuery(id);
    const {data: categories, isLoading} = useGetCityCategoriesQuery(id);

    const pageSetting = {
        noPaddingPage: true,
        isLoading:  isLoadingCity ? isLoadingCity : isLoadingWarehouses
    }

    return (
        <>
            <SimplePage
                title={city?.name}
                pageSetting={pageSetting}
                headerChildrenLeft={() => {
                    return (
                        <SelectWarehouse warehouses={warehouses}/>
                    )
                }}
                headerChildren={() => {
                    return (
                        <Cart/>
                    )
                }}
            >
                <Flex className={classes.clientStockPage}>
                    {categories?.length > 0 ?
                        <>
                            <ScrollArea className={classes.categories}>
                                <CategoriesTree categories={categories}/>
                            </ScrollArea>
                            <Box className={classes.clientStock}>
                                <ProductsClientStock/>
                            </Box>
                        </>
                        :
                        <>
                            <Box className={classes.clientStock}>
                                <EmptyStock/>
                            </Box>
                        </>
                    }
                </Flex>
            </SimplePage>
        </>
    )
}

export default ClientStock;