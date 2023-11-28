'use client'

import {Button, Flex, LoadingOverlay, Text} from "@mantine/core";
import PageHeader from "@/components/ui/page/pageHeader";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageContent from "@/components/ui/page/pageContent";
import NoProductsStock from "@/components/screens/supplier/stock/components/NoProductsStock";
import {useGetWarehouseQuery} from "@/store/api/warehouses.api";
import {useEffect, useState} from "react";
import {useActions} from "@/hooks/useActions";
import {useGetStockSupplierQuery} from "@/store/api/supplier/stockSupplier.api";
import classes from "@/components/screens/supplier/stock/components/stock.module.css";
import ProductsSupplier from "@/components/screens/supplier/stock/components/ProductsSupplier";
import { IconTag, IconSettings } from '@tabler/icons-react';
import Link from "next/link";

import StockTimer from "@/components/ui/StockTimer/StockTimer";
import _ from "lodash";
import echo from "@/config/laravel-echo";

interface Props {
    warehouse_id: number;
}

const StockPage = ({warehouse_id} : Props) => {
    const {setSelectedWarehouseSupplierStock} = useActions();

    const {data: warehouse} = useGetWarehouseQuery(warehouse_id);
    const {data: products, isLoading} = useGetStockSupplierQuery({
        'warehouse_id': warehouse_id
    })

    const updatedProducts = products;

    useEffect(() => {
        setSelectedWarehouseSupplierStock(warehouse_id)
    }, [warehouse_id]);

    return (
        <>
            <PageWrapper>
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 6 }} />
                <PageHeader title={warehouse?.address}>
                    <Flex gap="24px" justify="flex-end" align="center" direction="row" wrap="nowrap">
                        <StockTimer/>
                        <Link href={`${process.env.NEXT_PUBLIC_URL}/supplier/${warehouse_id}/add-stock`} className={classes.addStockBtn}>
                            <IconTag/> <Text>Добавить товар</Text>
                        </Link>
                        <Button>
                            <IconSettings/>
                        </Button>
                    </Flex>
                </PageHeader>
                <PageContent>
                    {products?.length > 0 ? <ProductsSupplier products={updatedProducts}/> : <NoProductsStock/>}
                </PageContent>
            </PageWrapper>
        </>
    )
}

export default StockPage;