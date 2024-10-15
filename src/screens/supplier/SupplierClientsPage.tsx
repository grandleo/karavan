'use client'

import SimplePage from "@/components/simplePage";
import {ActionIcon, Button, Center, Flex, Modal, Select, Skeleton, Table, Text} from "@mantine/core";
import SelectApiBot from "@/features/apiBots/components/SelectApiBot/SelectApiBot";
import {useEffect, useState} from "react";
import {useLazyFetchClientsByBotIdQuery, useUpdateSupplierClientStatusMutation} from "@/features/users/api/usersApi";
import {IconUsers} from "@tabler/icons-react";

const SupplierClientsPage = () => {
    const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
    const [triggerFetchClients, {data: responseData = {}, isLoading, isFetching}] = useLazyFetchClientsByBotIdQuery();
    const [updateStatus] = useUpdateSupplierClientStatusMutation();
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
    const [modalOpened, setModalOpened] = useState(false);

    const clients = responseData.clients || []; // Извлекаем клиентов из ответа
    const statuses = responseData.statuses || []; // Извлекаем статусы

    useEffect(() => {
        if (selectedBotId) {
            triggerFetchClients(selectedBotId);
        }
    }, [selectedBotId]);

    useEffect(() => {
        if (isLoading || isFetching) {
            setShowSkeleton(true);
        } else {
            const timer = setTimeout(() => setShowSkeleton(false), 300); // задержка в 300мс
            return () => clearTimeout(timer);
        }
    }, [isLoading, isFetching]);

    const handleStatusChange = (clientId: string, statusId: string) => {
        updateStatus({bot_id: selectedBotId, user_id: clientId, status_id: statusId});
        setModalOpened(false);
    };

    return (
        <SimplePage
            headerChildrenLeft={() => {
                return (
                    <SelectApiBot onSelectBotId={(botId) => setSelectedBotId(botId)}/>
                )
            }}
            isLoading={isLoading}
        >
            {showSkeleton ? (
                <>
                    {[...Array(7)].map((_, index) => (
                        <Skeleton key={index} height={30} mb="xs"/>
                    ))}
                </>
            ) : (
                <>
                    {!clients || clients.length === 0 ? (
                        <Center h="calc(100vh - 116px)">
                            <Flex direction="column" gap={16} align="center">
                                <ActionIcon variant="light" color="rgba(0, 0, 0, 1)" size="72" radius="50">
                                    <IconUsers style={{width: '50%', height: '50%'}} stroke={1.5}/>
                                </ActionIcon>
                                <Text size="24px" fw={800}>
                                    В данный момент нет пользователей в этом API
                                </Text>
                            </Flex>
                        </Center>
                    ) : (
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>ID</Table.Th>
                                    <Table.Th>Имя</Table.Th>
                                    <Table.Th>Компания</Table.Th>
                                    <Table.Th>Телефон</Table.Th>
                                    <Table.Th>Chat ID</Table.Th>
                                    <Table.Th>Статус</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {clients.map((client: any) => (
                                    <Table.Tr key={client.id}>
                                        <Table.Td>{client.id}</Table.Td>
                                        <Table.Td>{client.name}</Table.Td>
                                        <Table.Td>{client.company}</Table.Td>
                                        <Table.Td>{client.phone}</Table.Td>
                                        <Table.Td>{client.chat_id}</Table.Td>
                                        <Table.Td>
                                            <Select
                                                data={statuses.map((status: any) => ({
                                                    value: status.id.toString(), // Преобразуем status.id в строку
                                                    label: status.name,
                                                }))}
                                                value={client.status_id?.toString()} // Статус клиента теперь напрямую
                                                onChange={(statusId) => {
                                                    setSelectedClient({id: client.id, status_id: statusId});
                                                    setModalOpened(true);
                                                }}
                                            />
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    )}
                </>
            )}
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Подтверждение"
            >
                <Text>Вы уверены, что хотите изменить статус клиента?</Text>
                <Button
                    onClick={() => handleStatusChange(selectedClient.id, selectedClient.status_id)}
                >
                    Изменить статус
                </Button>
            </Modal>
        </SimplePage>
    )
};

export default SupplierClientsPage;