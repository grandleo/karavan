'use client'

import SimplePage from "@/components/simplePage";
import {StockForm, SupplierStockList} from "@/components/stock";
import {useFetchSupplierStockQuery} from "@/store/api/supplier/stockSupplier.api";
import React, {useEffect, useState} from "react";
import {Flex} from "@mantine/core";
import WarehouseSelector from "@/features/warehouses/components/WarehouseSelector";
import {useWarehouse} from "@/features/warehouses/providers/WarehouseProvider";

const SupplierStock = () => {
    const { selectedWarehouse } = useWarehouse();
    const [items, setItems] = useState<ISupplierProduct[]>([]);

    const [currency, setCurrency] = useState('')

    const {data: supplierProducts} = useFetchSupplierStockQuery({
        warehouse_id: selectedWarehouse
    }, {
        skip: !selectedWarehouse,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        setItems(supplierProducts)
    }, [supplierProducts]);

    return (
        <SimplePage
            headerChildrenLeft={() => {
                return (
                    <WarehouseSelector setCurrency={setCurrency}/>
                )
            }}
            headerChildren={() => {
                return (
                    <Flex
                        justify="flex-end"
                        gap={8}
                    >
                        <StockForm currency={currency}/>
                    </Flex>
                )
            }}
        >
            <>
                <SupplierStockList products={items} currency={currency}/>
            </>
        </SimplePage>
    )
}

export default SupplierStock;