import NextImage from "next/image";
import {Box, Divider, Flex, Image, NumberFormatter, Text} from "@mantine/core";
import {IOrderCard} from "@/features/orders/types/orders.types";
import classes from "./OrderCard.module.css";

interface OrderCardProps {
    order: IOrderCard;
    isActive: boolean;
    onClick: () => void;
}


const OrderCard = ({order, isActive, onClick}: OrderCardProps) => {
    return (
        <Box
            className={`${classes.orderCardWrapper} ${isActive ? classes.orderCardActive : ''}`}
            onClick={onClick}
        >
            <Flex wrap="nowrap" justify="space-between" mb={4}>
                <Text className={classes.orderCardClientId}>ID: {order.supplier_id}</Text>
                <Text className={classes.orderCardNumberId}>№ {order.id}</Text>
            </Flex>
            <Flex wrap="nowrap" justify="space-between">
                <Text className={classes.orderCardDate}>{order.order_date}</Text>
                <NumberFormatter
                    prefix={order.currency.prefix ? order.currency.prefix : ''}
                    suffix={order.currency.suffix ? order.currency.suffix : ''}
                    value={order.total_sum}
                    thousandSeparator=" "
                    className={classes.orderCardTotalSum}
                />
            </Flex>
            <Divider mt={8} mb={8}/>
            <Flex wrap="nowrap" justify="space-between" align="center">
                <Text className={classes.orderCardDeliveryStatus}>
                    {order.delivery_status_name}
                </Text>
                {order.payment_status_image && (
                    <Image
                        component={NextImage}
                        src={order.payment_status_image}
                        alt=""
                        width="24"
                        height="24"
                        fit="contain"
                    />
                )}
            </Flex>
        </Box>
    )
}

export default OrderCard;