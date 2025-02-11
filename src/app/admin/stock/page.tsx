'use client'

import {useFetchAllStockQuery} from "@/features/products/api/productsApi";
import {Table} from "@mantine/core";
import PageWrapper from "@/components/PageWrapper";

export default function Page() {
    // Запрашиваем данные стока через RTK Query
    const { data, error, isLoading } = useFetchAllStockQuery('');

    return (
        <>
            <PageWrapper>
            <Table highlightOnHover withBorder withColumnBorders>
                <Table.Thead>
                <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Название</Table.Th>
                    <Table.Th>Артикул</Table.Th>
                    <Table.Th>Количество</Table.Th>
                    <Table.Th>Цена</Table.Th>
                </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data && data.length > 0 ? (
                        data.map((item: any) => (
                            <Table.Tr key={item.id}>
                                <Table.Td>{item.id}</Table.Td>
                                <Table.Td>{item.product?.name}</Table.Td>
                                <Table.Td>{item.product?.article}</Table.Td>
                                <Table.Td>{item.qty}</Table.Td>
                                <Table.Td>{item.price}</Table.Td>
                            </Table.Tr>
                        ))
                    ) : (
                    <Table.Tr>
                        <Table.Td colSpan={6} align="center">Нет данных</Table.Td>
                    </Table.Tr>
                )}
                </Table.Tbody>
            </Table>
            </PageWrapper>
        </>
    )
}