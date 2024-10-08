'use client'

import {useGetUsersQuery} from "@/store/api/admin/users.api";
import SimplePage from "../../../../simplePage";
import {Paper, Table} from "@mantine/core";
import EmptyData from "@/components/emptyData";
import AdminRow from "@/components/pages/admin/users/admins/components/adminRow";

const Admins = () => {
    const {data: admins, isLoading} = useGetUsersQuery({
        role: 'admin',
    });

    return (
        <SimplePage title="Администраторы" isLoading={isLoading}>
            {admins?.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w={40}>ID</Table.Th>
                                <Table.Th>Имя администратора</Table.Th>
                                <Table.Th w={125}>Телефон</Table.Th>
                                <Table.Th w={220}>Email</Table.Th>
                                <Table.Th w={30}></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {admins.map( (admin: IUser, index: number) => {
                                return (
                                    <AdminRow user={admin} key={index} open={open}/>
                                )
                            } )}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <EmptyData height={400} text="Нет администраторов"/>
            )}
        </SimplePage>
    )
}

export default Admins;