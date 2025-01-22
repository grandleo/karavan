'use client'

import SimplePage from "../../../../simplePage";
import {useGetUsersQuery} from "@/store/api/admin/users.api";
import {Paper, Table} from "@mantine/core";
import ClientRow from "@/components/pages/admin/users/clients/components/clientRow";
import EmptyData from "@/components/emptyData";
import {useEffect} from "react";

const Clients = () => {
    const {data: clients, isLoading} = useGetUsersQuery({
        role: 'client'
    });

    useEffect(() => {

        return () => {
        };
    }, []);

    console.log(clients);

    return (
        <SimplePage title="Клиенты" isLoading={isLoading}>

            {clients?.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w={40}>ID</Table.Th>
                                <Table.Th>Имя клиента</Table.Th>
                                <Table.Th w={220}>Компания</Table.Th>
                                <Table.Th w={125}>Телефон</Table.Th>
                                <Table.Th w={220}>Email</Table.Th>
                                <Table.Th w={30}></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {clients.map((user: IUser, index: number) => {
                                return (
                                    <ClientRow user={user} open={open} key={index}/>
                                )
                            })}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <EmptyData height={400} text="Нет клиентов"/>
            )}
        </SimplePage>
    )
}

export default Clients;