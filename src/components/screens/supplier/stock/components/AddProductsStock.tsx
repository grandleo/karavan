'use client'

import {Box} from "@mantine/core";
import SelectCategory from "@/components/screens/supplier/stock/components/SelectCategory";
import CategoriesTree from "@/components/screens/supplier/stock/components/CategoriesTree";
import classes from "./stock.module.css";
import {useEffect} from "react";
import {useGetCategoryProductsForSupplierStockQuery} from "@/store/api/supplier/stockSupplier.api";
import ProductsStock from "@/components/screens/supplier/stock/components/ProductsStock";
import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";
import {useActions} from "@/hooks/useActions";
import Page from "@/components/ui/page/Page";

interface Props {
    warehouse_id: number;
}

const AddProductsStock = ({warehouse_id} : Props) => {
    const {setSelectedWarehouseSupplierStock} = useActions();
    const {selectedCategory, selectedWarehouse} = useSelector(getSupplierStock);

    useEffect(() => {
        setSelectedWarehouseSupplierStock(warehouse_id)
    }, [warehouse_id]);

    const {data: products, isLoading} = useGetCategoryProductsForSupplierStockQuery({
        'category_id': selectedCategory,
        'warehouse_id': selectedWarehouse
    })

    const pageSetting = {
        backButton: true,
        noPaddingPage: true,
    }

    return (
        <>
            <Page title="Формирование каталога товаров" pageSetting={pageSetting}>
                <Box className={classes.addStockFlex}>
                    <Box className={classes.addStockCategoryTree}>
                        <CategoriesTree/>
                    </Box>
                    <Box className={classes.addStockProducts}>
                        {products?.length > 0 ? <ProductsStock products={products} /> : <SelectCategory/>}
                    </Box>
                </Box>
            </Page>
        </>
    )
}

export default AddProductsStock;