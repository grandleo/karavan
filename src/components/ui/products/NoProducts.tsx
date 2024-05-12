import {Box, Text} from "@mantine/core";
import {IconCurrencyDollar} from "@tabler/icons-react";
import classes from "./productsList.module.css";
import ProductForm from "@/components/ui/products/ProductForm";

interface Props {
    opened: boolean,
    open: () => void,
    close: () => void
}

const NoProducts = ({opened = false, open, close} : Props) => {

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
                    <ProductForm showButton={true} opened={opened} open={open} close={close}/>
                </Box>
            </Box>
        </>
    )
}

export default NoProducts;