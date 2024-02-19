'use client'

import PageHeader from "@/components/simplePage/pageHeader";
import {Paper, Table} from "@mantine/core";
import PageWrapper from "@/components/simplePage/pageWrapper";
import PageContent from "@/components/simplePage/pageContent";
import {useGetOrdersForLogisticQuery} from "@/store/api/logistic/orders.api";

const OrdersLogisticPage = () => {

    const {data: orders} = useGetOrdersForLogisticQuery('');

    return (
        <>
            <PageWrapper>
                <PageHeader title="Доступные заказы"/>
                <PageContent>
                    <Paper>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>ID</Table.Th>
                                    <Table.Th>Погрузка</Table.Th>
                                    <Table.Th>Выгрузка</Table.Th>
                                    <Table.Th>О грузе</Table.Th>
                                    <Table.Th>Лучшая цена</Table.Th>
                                    <Table.Th>Ваша цена</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {orders?.map((order: any, index:number) => {
                                    return (
                                        <Table.Tr key={index}>
                                            <Table.Td>{order.number_id}</Table.Td>
                                            <Table.Td>{order.warehouse_supplier}</Table.Td>
                                            <Table.Td>{order.warehouse_client}</Table.Td>
                                            <Table.Td>Вес: 15 кг, Габариты: 400 x 400 x 400 мм</Table.Td>
                                            <Table.Td>1 500 ₽</Table.Td>
                                            <Table.Td>1 514 ₽</Table.Td>
                                        </Table.Tr>
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </PageContent>
            </PageWrapper>
        </>
    )
}

export default OrdersLogisticPage;