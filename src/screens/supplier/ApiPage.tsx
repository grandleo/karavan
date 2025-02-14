'use client'

import SimplePage from "@/components/simplePage";
import {ActionIcon, Button, Center, Flex, Switch, Table, Text} from "@mantine/core";
import {IconApiApp, IconCirclePlusFilled, IconPencilMinus} from "@tabler/icons-react";
import ApiBotForm from "@/features/apiBots/components/ApiBotForm";
import useApiBotManager from "@/features/apiBots/hooks/useApiBotManager";
import {useTranslation} from "@/hooks/useTranslation";

const ApiPage = () => {
    const { trans } = useTranslation();
    const {
        apiBots,
        isLoadingWithDelay,
        opened,
        formMode,
        selectedApiBotId,
        selectedApiBot,
        handleToggle,
        openAddForm,
        openEditForm,
        closeForm,
    } = useApiBotManager();

    return (
        <>
            <SimplePage
                headerChildren={() => {
                    return (
                        <Button
                            onClick={openAddForm}
                            leftSection={<IconCirclePlusFilled size={16} />}
                        >
                            {trans('api', 'buttons.add')}
                        </Button>
                    )
                }}
                isLoading={isLoadingWithDelay}
            >
                {apiBots && apiBots.length > 0 ? (
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{trans('api', 'table.off')}</Table.Th>
                            <Table.Th>{trans('api', 'table.name')}</Table.Th>
                            <Table.Th>{trans('api', 'table.warehouses')}</Table.Th>
                            <Table.Th>{trans('api', 'table.action')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {apiBots?.map((item: any, index: number) => {
                            return (
                                <Table.Tr key={index}>
                                    <Table.Td>
                                        <Switch
                                            checked={item.active} // Предполагается, что есть поле `active`
                                            onChange={() => handleToggle(item.id)}
                                            size="md"
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        {item.name}
                                    </Table.Td>
                                    <Table.Td>
                                        {item.warehouses_list}
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon
                                            variant="white"
                                            color="rgba(0, 0, 0, 1)"
                                            aria-label="Редактировать"
                                            onClick={() => openEditForm(item.id)}
                                        >
                                            <IconPencilMinus style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            )
                        })}
                    </Table.Tbody>
                </Table>
                ) : (
                    // Если apiBots отсутствуют, отображаем сообщение и кнопку
                    <Center h="calc(100vh - 116px)">
                        <Flex direction="column" gap={16} align="center">
                            <ActionIcon variant="light" color="rgba(0, 0, 0, 1)" size="72" radius="50">
                                <IconApiApp style={{ width: '50%', height: '50%' }} stroke={1.5} />
                            </ActionIcon>
                            <Text size="24px" fw={800}>
                                {trans('api', 'no_api')}
                            </Text>
                            <Button
                                leftSection={<IconCirclePlusFilled size={16} />}
                                onClick={openAddForm}
                                fullWidth>
                                {trans('api', 'buttons.add')}
                            </Button>
                        </Flex>
                    </Center>
                )}

                <ApiBotForm
                    opened={opened}
                    close={closeForm}
                    mode={formMode}
                    apiBotId={selectedApiBotId}
                    initialData={selectedApiBot}
                />
            </SimplePage>

        </>
    )
}

export default ApiPage;