'use client'

import {Menu, Select, Skeleton, Table, rem, Button, UnstyledButton} from "@mantine/core";
import {IconDotsVertical, IconMessageCircle, IconSettings, IconTrash} from "@tabler/icons-react";
import PageWrapper from "@/components/ui/page/pageWrapper";
import PageHeader from "@/components/ui/page/pageHeader";
import PageContent from "@/components/ui/page/pageContent";

const ClientsPage = () => {
    return (
        <>
            <PageWrapper>
                <PageHeader title="Клиенты"/>
                <PageContent>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>ID</Table.Th>
                                <Table.Th>Имя клиента</Table.Th>
                                <Table.Th>Статус</Table.Th>
                                <Table.Th>Компания</Table.Th>
                                <Table.Th>Телефон</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {Array(25)
                                .fill(0)
                                .map((_, index) => (
                                    <Table.Tr key={index}>
                                        <Table.Td>
                                            313323
                                        </Table.Td>
                                        <Table.Td>
                                            Черныш Александ Сергеевич
                                        </Table.Td>
                                        <Table.Td>
                                            <Select
                                                data={['Не проверена', 'Активен', 'Заблокирован']}
                                                defaultValue="Не проверена"
                                                clearable
                                            />
                                        </Table.Td>
                                        <Table.Td>
                                            Название компании
                                        </Table.Td>
                                        <Table.Td>
                                            +79999999999
                                        </Table.Td>
                                        <Table.Td>
                                            mail@mail.ru
                                        </Table.Td>
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
                                ))}
                        </Table.Tbody>
                    </Table>
                </PageContent>
            </PageWrapper>
        </>
    )
}

export default ClientsPage;