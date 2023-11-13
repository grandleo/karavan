import {Box, Text} from "@mantine/core";
import {IconCurrencyDollar} from "@tabler/icons-react";
import classes from "./emptyData.module.css";

const EmptyProductsForClient = () => {
    return (
        <>
        <Box className={classes.emptyData}>
            <Box className={classes.emptyDataIcon}>
                <IconCurrencyDollar size={28}/>
            </Box>
            <Box>
                <Text className={classes.emptyDataHeader}>Нет товаров</Text>
            </Box>
            <Box>
                <Text className={classes.emptyDataText}>В данный момент нет товаров в стоке вашего города</Text>
            </Box>
        </Box>
        </>
    )
}

export default EmptyProductsForClient;