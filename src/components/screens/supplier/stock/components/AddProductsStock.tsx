'use client'

import PageHeader from "@/components/ui/page/pageHeader";
import {Box, Button} from "@mantine/core";
import PageContent from "@/components/ui/page/pageContent";
import NoProductsStock from "@/components/screens/supplier/stock/components/NoProductsStock";
import PageWrapper from "@/components/ui/page/pageWrapper";
import SelectCategory from "@/components/screens/supplier/stock/components/SelectCategory";
import CategoriesTree from "@/components/screens/supplier/stock/components/CategoriesTree";
import classes from "./stock.module.css";
import {useEffect} from "react";
import {useGetCategoryProductsForSupplierStockQuery} from "@/store/api/supplier/stockSupplier.api";
import ProductsStock from "@/components/screens/supplier/stock/components/ProductsStock";
import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";
import {useActions} from "@/hooks/useActions";

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

    return (
        <>
            <PageWrapper>
                <PageHeader title="Формирование каталога товаров" backButton={true}>
                    <Button>Редактировать</Button>
                    <Button>+</Button>
                </PageHeader>
                <PageContent noPadding={true}>
                    <Box className={classes.addStockFlex}>
                        <Box className={classes.addStockCategoryTree}>
                            <CategoriesTree/>
                        </Box>
                        <Box className={classes.addStockProducts}>
                            {products?.length > 0 ? <ProductsStock products={products} /> : <SelectCategory/>}
                        </Box>
                    </Box>
                </PageContent>
            </PageWrapper>
        </>
    )
}

export default AddProductsStock;