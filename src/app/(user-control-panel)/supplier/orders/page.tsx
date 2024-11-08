'use client'

import React, {useState} from "react";
import PageWrapper from "@/components/PageWrapper";
import {
    useFetchSupplierOrderNumbersQuery,
    useLazyFetchSupplierOrderDetailsQuery
} from "@/features/orders/api/ordersApi";
import SidebarOrders from "@/features/orders/components/SidebarOrders/SidebarOrders";
import OrderDetail from "@/features/orders/components/OrderDetail/OrderDetail";
import {ActionIcon, Center, Flex, Text} from "@mantine/core";
import {IconMoodEmpty} from "@tabler/icons-react";
import {useTranslation} from "@/hooks/useTranslation";

export default function Page() {
    const { trans } = useTranslation();
    const {data: orders, isLoading, isFetching} = useFetchSupplierOrderNumbersQuery('', {
        refetchOnMountOrArgChange: true,
    });

    const [fetchOrderDetails, {data: orderDetails}] = useLazyFetchSupplierOrderDetailsQuery();

    // Состояние для хранения ID активного заказа
    const [activeOrderId, setActiveOrderId] = useState<number | null>(null);

    // Функция выбора заказа
    const handleSelectOrder = (orderId: number) => {
        setActiveOrderId(orderId);  // Устанавливаем активный заказ
        fetchOrderDetails(orderId); // Запрашиваем детали выбранного заказа
    };

    return (
        <>
            <PageWrapper
                sidebarContent={
                    orders?.length > 0 && (
                        <SidebarOrders orders={orders} activeOrderId={activeOrderId} onSelectOrder={handleSelectOrder}/>
                    )
                }
            >
                {orderDetails ? (
                    <OrderDetail orderDetails={orderDetails?.order}
                                 deliveryStatuses={orderDetails?.delivery_statuses}
                                 paymentStatuses={orderDetails?.payment_statuses}
                    />
                ) : (
                    <Center h="calc(100vh - 116px)">
                        <Flex direction="column" gap={16} align="center">
                            <ActionIcon variant="light" color="rgba(0, 0, 0, 1)" size="72" radius="50">
                                <IconMoodEmpty/>
                            </ActionIcon>
                            <Text size="24px" fw={800}>
                                {trans('orders', 'supplier.no_orders')}
                            </Text>
                        </Flex>
                    </Center>
                )}
            </PageWrapper>
        </>
    )
}