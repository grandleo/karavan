'use client'

import {Menu, rem, Select, Table, UnstyledButton} from "@mantine/core";
import {IconDotsVertical, IconMessageCircle, IconSettings, IconTrash} from "@tabler/icons-react";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageHeader from "@/components/ui/page/pageHeader";
import PageContent from "@/components/ui/page/pageContent";
import {useGetUsersQuery} from "@/store/api/admin/users.api";
import {Fragment} from "react";

const SuppliersPage = () => {
    const {data: suppliers, isLoading} = useGetUsersQuery('supplier');

    return (
        <>
            <PageWrapper>
                <PageHeader title="Поставщики"/>
                <PageContent>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>ID</Table.Th>
                                <Table.Th>Имя клиента</Table.Th>
                                <Table.Th>Телефон</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {suppliers?.map((user: any, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <Table.Tr key={index}>
                                            <Table.Td>{user.id}</Table.Td>
                                            <Table.Td>{user.surname + ' ' + user.name  + ' ' + user.patronymic}</Table.Td>
                                            <Table.Td>{user.phone}</Table.Td>
                                            <Table.Td>{user.email}</Table.Td>
                                            <Table.Td>
                                                <Menu shadow="md" width={200}>
                                                    <Menu.Target>
                                                        <UnstyledButton>
                                                            <IconDotsVertical/>
                                                        </UnstyledButton>
                                                    </Menu.Target>

                                                    <Menu.Dropdown>
                                                        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                                            Настройки
                                                        </Menu.Item>
                                                        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                                                            Сообщения
                                                        </Menu.Item>

                                                        <Menu.Divider />
                                                        <Menu.Item
                                                            color="red"
                                                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                                        >
                                                            Удалить
                                                        </Menu.Item>
                                                    </Menu.Dropdown>
                                                </Menu>
                                            </Table.Td>
                                        </Table.Tr>
                                    </Fragment>
                                )
                            })}
                        </Table.Tbody>
                    </Table>
                </PageContent>
            </PageWrapper>
        </>
    )
}

export default SuppliersPage;