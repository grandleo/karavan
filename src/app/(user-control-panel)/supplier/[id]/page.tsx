'use client'

import {NumberInput, Table, TextInput} from "@mantine/core";
import {useGetAllProductsQuery} from "@/store/api/admin/products.api";

export default function Page({ params }: { params: { id: string } }) {

    const {data} = useGetAllProductsQuery('');

    return (
        <>
            <div>ID склада: {params.id}</div>
            <Table.ScrollContainer minWidth={500}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>№</Table.Th>
                            <Table.Th>Наименование</Table.Th>
                            <Table.Th>На складе</Table.Th>
                            <Table.Th>Цена</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {data?.map((product: any, index: number) => {
                            return (
                                <Table.Tr key={product.id}>
                                    <Table.Td>{index+1}</Table.Td>
                                    <Table.Td>{product.name}</Table.Td>
                                    <Table.Td>
                                        <NumberInput
                                            placeholder="0"
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <TextInput
                                            rightSectionPointerEvents="none"
                                            rightSection="P"
                                            placeholder="0"
                                        />
                                    </Table.Td>
                                </Table.Tr>
                            )
                        })}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    )
}