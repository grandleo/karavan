'use client'

import SimplePage from "../../../../simplePage";
import {Paper, Table} from "@mantine/core";
import {useGetUsersQuery} from "@/store/api/admin/users.api";
import EmptyData from "@/components/emptyData";
import SupplierRow from "@/components/pages/admin/users/suppliers/components/supplierRow";
import {useEffect} from "react";

const Suppliers = () => {

    const {data: suppliers, isLoading} = useGetUsersQuery({
        role: 'supplier',
    });

    useEffect(() => {
    }, []);

    return (
        <SimplePage title="Поставщики" isLoading={isLoading}>

            {suppliers?.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w={40}>ID</Table.Th>
                                <Table.Th>Имя поставщика</Table.Th>
                                <Table.Th w={220}>Компания</Table.Th>
                                <Table.Th w={110}>Инн</Table.Th>
                                <Table.Th w={125}>Телефон</Table.Th>
                                <Table.Th w={220}>Email</Table.Th>
                                <Table.Th w={80}>Складов</Table.Th>
                                <Table.Th w={30}></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {suppliers.map( (supplier: IUser, index: number) => {
                                return (
                                    <SupplierRow user={supplier} open={open} key={index}/>
                                )
                            } )}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <EmptyData height={400} text="Нет поставщиков"/>
            )}
        </SimplePage>
    )
}

export default Suppliers;