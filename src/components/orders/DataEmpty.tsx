import {Box, Flex, Text} from "@mantine/core";
import {IconSearch, IconTruckDelivery} from "@tabler/icons-react";
import classes from "./orders.module.css";

export const NoOrders = () => {
    return (
        <>
            <Flex direction="column" align="center" justify="center" className={classes.dataEmpty}>
                <Box className={classes.dataEmptyIcon}>
                    <IconTruckDelivery size={40}/>
                </Box>
                <Text>В данный момент нет заказов</Text>
            </Flex>
        </>
    )
}

export const SelectOrder = () => {
    return (
        <>

            <Flex direction="column" align="center" justify="center" className={classes.dataEmpty}>
                <Box className={classes.dataEmptyIcon}>
                    <IconTruckDelivery size={40}/>
                </Box>
                <Text>Выберите заказ для просмотра детальной информации</Text>
            </Flex>

        </>
    )
}

export const NoBids = () => {
    return (
        <>

            <Flex direction="column" align="center" justify="center" className={classes.dataEmptyBids}>
                <Box className={classes.dataEmptyIcon}>
                    <IconSearch size={40}/>
                </Box>
                <Text>Заказ собран, идет поиск логиста</Text>
            </Flex>

        </>
    )
}