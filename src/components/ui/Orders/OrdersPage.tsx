
import EmptyOrders from "@/components/ui/EmptyData/EmptyOrders";
import {useChangeStatusMutation, useGetOrderQuery, useGetOrdersQuery} from "@/store/api/order.api";
import {Badge, Box, Button, Card, Flex, Paper, Table, Text} from "@mantine/core";
import classes from "./orders.module.css";
import React, {useState} from "react";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useApproveBidMutation} from "@/store/api/logistic/bids.api";

const OrdersPage = () => {
    const [activeOrder, setActiveOrder] = useState(0);
    const {data: orders} = useGetOrdersQuery('');

    return (
        <>
            {orders?.length === 0 ? <EmptyOrders/> :
                <>
                    <Box className={classes.ordersPage}>
                        <Box className={classes.orders}>
                            <Orders orders={orders} setActiveOrder={setActiveOrder}/>
                        </Box>
                        <Box className={classes.orderInfo}>
                            <Order activeOrder={activeOrder}/>
                        </Box>
                    </Box>
                </>
            }
        </>
    )
}

const Orders = ({orders, setActiveOrder}: any) => {
    return (
        <>
            {orders?.map((order: any, index: number) => {
                return (
                    <Card shadow="sm" padding="lg" radius="md" withBorder mb={24} key={index} onClick={() => setActiveOrder(order.number_id)}>
                        <Card.Section withBorder inheritPadding py="xs">
                            <Box className={classes.orderHeader}>
                                <Box>
                                    <Text className={classes.orderNumber}>Заказ №{order.number_id}</Text>
                                    <Text className={classes.orderDate}>{order.date}</Text>
                                </Box>
                                <Box>
                                    <Text className={classes.orderPrice}>{order.totalAmount} ₽</Text>
                                    <Badge color="red" variant="light">
                                        {order.status_name}
                                    </Badge>
                                </Box>
                            </Box>
                        </Card.Section>
                        <Card.Section inheritPadding mt="sm" pb="md">
                            <Text className={classes.deliveryDate}>Дата доставки: 3-5 дня</Text>
                        </Card.Section>
                    </Card>
                )
            })}
        </>
    )
}

const Order = ({activeOrder}: any) => {

    const {data: order} = useGetOrderQuery(activeOrder);

    const [changeStatus] = useChangeStatusMutation();
    const [approveBid] = useApproveBidMutation();

    const changeOrderStatus = () => {
        if(order.change_status){
            changeStatus(order.number_id).unwrap()
                .then((payload) => {
                    SuccessNotifications(payload)
                })
                .catch((error) => ErrorNotifications(error))
        }
    }

    const approve = (id: number) => {
        approveBid({'bid_id': id}).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    }

    return (
        <>
            {order === undefined ? <EmptyOrder/> :
            <>
                <Card shadow="sm" padding="lg" radius="md" withBorder mb={24}>
                    <Card.Section withBorder inheritPadding py="xs">
                        <Box className={classes.orderHeader}>
                            <Box className={classes.orderNumber}>
                                <Text className={classes.orderNumberDate}>Заказ №{order.number_id} от {order.date}</Text>
                                <Badge color="red" variant="light">
                                    {order.status_name}
                                </Badge>
                            </Box>
                        </Box>
                    </Card.Section>
                    <Card.Section inheritPadding mt="sm" pb="md">
                        <Box className={classes.orderInformation}>
                            <Box>
                                <Text className={classes.title}>Адрес доставки</Text>
                                <Text className={classes.text}>{order.warehouse}</Text>
                            </Box>
                            <Box>
                                <Text className={classes.title}>Контактное лицо поставщика</Text>
                                <Text className={classes.text}>{order.contacts.name}</Text>
                            </Box>
                            <Box>
                                <Text className={classes.title}>Телефон</Text>
                                <Text className={classes.text}>{order.contacts.phone}</Text>
                            </Box>
                            <Box>
                                <Text className={classes.title}>Компания</Text>
                                <Text className={classes.text}>{order.contacts.company}</Text>
                            </Box>
                        </Box>
                    </Card.Section>
                </Card>

                <Box className={classes.deliveryHistory} mb={24}>
                    <Box>Текущий статус: {order.status_name}</Box>
                    <Box><Button variant="light" disabled={!order.change_status} onClick={changeOrderStatus}>Сменить статус</Button></Box>
                </Box>

                {order?.bids.length > 0 && (
                    <Paper mb={24} p={10}>

                        <Text>Заявки на доставку от логиста</Text>

                        {order.bids.map((bid: any, index: number) => {
                            return (
                                <>
                                    <Flex gap="md"
                                          justify="space-between"
                                          align="center"
                                          direction="row"
                                          wrap="wrap"
                                          mb={10} mt={10}
                                          key={index}
                                    >

                                        <Box style={{flexGrow: 1}}>{bid.company}</Box>
                                        <Box>{bid.price}</Box>
                                        <Button ml={15} onClick={() => approve(bid.id)}>Выбрать</Button>

                                    </Flex>
                                </>
                            )
                        })}
                    </Paper>
                )}

                <Paper shadow="xs">
                    <Table highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={3} className={classes.orderComposition}>Состав заказа</Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th className={classes.tableHeader}>Наименование</Table.Th>
                                <Table.Th className={classes.tableHeader}>Статус сбора</Table.Th>
                                <Table.Th className={classes.tableHeader}>Стоимость</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {order?.products.map((product: any, index: number) => {
                                return (
                                    <Table.Tr key={index}>
                                        <Table.Td>
                                            <Text className={classes.productName}>{product.name}</Text>
                                            <Text className={classes.attributes}>Кол-во: {product.quantity}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge variant="light" color="rgba(128, 128, 128, 1)">Собирается</Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            {product.price} ₽
                                        </Table.Td>
                                    </Table.Tr>
                                )
                            })}

                            <Table.Tr>
                                <Table.Td colSpan={3} className={classes.orderTotal}>
                                    <Text className={classes.totalWeight}>Общий вес:</Text>
                                    <Text className={classes.totalDimensions}>Габариты заказа:</Text>
                                    <Text className={classes.totalAmount}>Итого: <span>{order.totalAmount} ₽</span></Text>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Paper>
            </>
            }
        </>
    )
}

const EmptyOrder = () => {
    return (
        <>
            <Box>Выберите заказ для просмотра детальной информации</Box>
        </>
    )
}

export default OrdersPage;