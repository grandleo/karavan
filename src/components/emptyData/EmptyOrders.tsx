import {Box, Text} from "@mantine/core";
import {IconTruckDelivery} from "@tabler/icons-react";
import classes from "@/components/ui/EmptyData/emptyData.module.css";

const EmptyOrders = () => {
    return (
        <>
            <Box className={classes.emptyData}>
                <Box className={classes.emptyDataIcon}>
                    <IconTruckDelivery size={28}/>
                </Box>
                <Box>
                    <Text className={classes.emptyDataHeader}>Нет заказов</Text>
                </Box>
                <Box>
                    <Text className={classes.emptyDataText}>В данный момент нет заказов</Text>
                </Box>
            </Box>
        </>
    )
}

export default EmptyOrders;