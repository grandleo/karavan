'use client'

import {Box, Flex, ScrollArea} from "@mantine/core";
import SimplePage from "@/components/ui/page/SimplePage";
import ExternalOrderCard from "@/components/orders/ExternalOrderCard";
import Order from "@/components/orders/Order";
import classes from "./orders.module.css";
import {useGetOrdersQuery} from "@/store/api/order.api";
import {IOrderCard} from "@/components/orders/types";
import {NoOrders} from "@/components/orders/DataEmpty";

const Orders2 = () => {
    const {data: orders} = useGetOrdersQuery('');

    const pageSetting = {
        noPaddingPage: true,
    }

    return (
        <>
            <SimplePage title="Заказы" pageSetting={pageSetting}>
                <Flex className={classes.ordersPage}>

                    {orders?.length > 0 ? (

                        <>
                            <ScrollArea className={classes.externalOrdersCards}>
                                {orders.map( (order: IOrderCard, index: number) => {
                                    return (
                                        <ExternalOrderCard order={order} key={index}/>
                                    )
                                })}
                            </ScrollArea>
                            <Box style={{flexGrow: 1, padding: 16}} className={classes.order}>
                                <Order />
                            </Box>
                        </>
                    ) : <Box style={{flexGrow: 1, padding: 16}} className={classes.order}><NoOrders/></Box>}
                </Flex>
            </SimplePage>
        </>
    )
}

export default Orders2;