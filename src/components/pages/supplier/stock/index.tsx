'use client'

import SimplePage from "@/components/simplePage";
import {StockForm, SupplierStockList, Timer} from "@/components/stock";
import {useFetchSupplierStockQuery} from "@/store/api/supplier/stockSupplier.api";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Flex, Group, Select, SelectProps} from "@mantine/core";
import {IconCheck} from "@tabler/icons-react";
import WarehouseSelector from "@/features/warehouses/components/WarehouseSelector";
import {useWarehouse} from "@/features/warehouses/providers/WarehouseProvider";

const SupplierStock = () => {
    const { selectedWarehouse } = useWarehouse();
    const [items, setItems] = useState<ISupplierProduct[]>([])

    const {data: supplierProducts} = useFetchSupplierStockQuery({
        warehouse_id: selectedWarehouse
    }, {
        skip: !selectedWarehouse
    })

    useEffect(() => {
        setItems(supplierProducts)
    }, [supplierProducts]);

    return (
        <SimplePage
            headerChildrenLeft={() => {
                return (
                    <WarehouseSelector/>
                )
            }}
            headerChildren={() => {
                return (
                    <Flex
                        justify="flex-end"
                        gap={8}
                    >
                        <StockForm/>
                    </Flex>
                )
            }}
        >
            <>
                <SupplierStockList products={items}/>
            </>
        </SimplePage>
    )
}

export default SupplierStock;