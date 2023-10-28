import {Box, Button, Text} from "@mantine/core";
import {IconCurrencyDollar} from "@tabler/icons-react";
import { IconTag } from '@tabler/icons-react';
import classes from "./stock.module.css";
import Link from "next/link";
import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";

interface Props {
}

const NoProductsStock = ({}: Props) => {
    const {selectedWarehouse} = useSelector(getSupplierStock);

    return (
        <Box className={classes.noProductStock}>
            <Box className={classes.noProductsStockIcon}>
                <IconTag size={28}/>
            </Box>

            <Box>
                <Text className={classes.noProductStockHeader}>Нет товаров на складе</Text>
            </Box>

            <Box>
                <Text className={classes.noProductStockText}>Для старта продаж сформируйте каталог товаров</Text>
            </Box>

            <Button component="a" href={`${process.env.NEXT_PUBLIC_URL}/supplier/${selectedWarehouse}/add-stock`} className={classes.noProductStockBtn}>Сформировать каталог</Button>
        </Box>
    )
}

export default NoProductsStock;