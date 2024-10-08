import {Card, Group, Text, Box, NumberFormatter, Flex} from "@mantine/core";
import StatusBadge from "@/components/orders/StatusBadge";
import {OrderCardProps} from "@/components/orders/types";
import classes from "./orders.module.css";

const ExternalOrderCard = ({order} : OrderCardProps) => {

    return (
        <>
            <Card shadow="xs" radius="md" withBorder mb={12} className={`${classes.externalOrderCard}`}>
                <Card.Section  p={8} withBorder>
                    <Group justify="space-between">
                        <Box>
                            <Flex direction="column" gap={8}>
                                <Text className={classes.orderNumber}>Заказ №{order.number_id}</Text>
                                <Text className={classes.orderDate}>{order.date}</Text>
                            </Flex>
                        </Box>
                        <Box>
                            <Flex direction="column" gap={8}>
                                <Text className={classes.orderPrice}>
                                    <NumberFormatter value={order.totalAmount} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/>
                                </Text>
                                <StatusBadge color={order.status.color} bg_color={order.status.bg_color} text={order.status.name}/>
                            </Flex>
                        </Box>
                    </Group>
                </Card.Section>
                <Card.Section p={8}>
                    <Text className={classes.orderDeliveryDate}>
                        Дата доставки: {order.delivery_date}
                    </Text>
                </Card.Section>
            </Card>
        </>
    )
}

export default ExternalOrderCard;