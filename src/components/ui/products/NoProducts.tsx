import {Box, Text} from "@mantine/core";
import {IconCurrencyDollar} from "@tabler/icons-react";
import classes from "./productsList.module.css";
import AddProductItem from "@/components/ui/products/AddProductItem";

interface Props {
    activeCategory: number;
}

const NoProducts = ({activeCategory}: Props) => {
    return (
        <>
            <Box className={classes.noProducts}>
                <Box className={classes.noProductsIcon}>
                    <IconCurrencyDollar size={28}/>
                </Box>

                <Box>
                    <Text className={classes.noProductsHeader}>Нет товаров</Text>
                </Box>

                <Box>
                    <AddProductItem activeCategory={activeCategory}/>
                </Box>
            </Box>
        </>
    )
}

export default NoProducts;