'use client'

import SimplePage from "@/components/simplePage";
import {StockForm, SupplierStockList, Timer} from "@/components/stock";
import {useFetchSupplierStockQuery} from "@/store/api/supplier/stockSupplier.api";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Flex} from "@mantine/core";

const SupplierStock = () => {
    const {id} = useParams<{ id: string; }>();
    const [items, setItems] = useState<ISupplierProduct[]>([])

    const {data: supplierProducts} = useFetchSupplierStockQuery({
        warehouse_id: id
    }, {
        skip: id === null
    })

    useEffect(() => {
        setItems(supplierProducts)
    }, [supplierProducts]);


    return (
        <SimplePage
            title="Сток товаров"
            headerChildren={() => {
                return (
                    <Flex
                        justify="flex-end"
                        gap={8}
                    >
                        <Timer/>
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