import {Paper, Table, Text} from "@mantine/core";
import {BotApiItem} from "@/components/botsApi";
import EmptyData from "@/components/emptyData";
import {IconApi} from "@tabler/icons-react";

const BotsApiList = ({apiBots, handleToggleActiveBotApi, onDelete} : BotsApiListTypes) => {
    return (
        <>
            {apiBots.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w="1%">Вкл/Выкл</Table.Th>
                                <Table.Th>Название</Table.Th>
                                <Table.Th>Склады</Table.Th>
                                <Table.Th w="1%">Действия</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {apiBots.map((api : IBotType) => (
                                <BotApiItem key={api.id} apiBot={api} onDelete={onDelete} handleToggleActiveBotApi={handleToggleActiveBotApi} />
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <EmptyData height="calc(100vh - 130px)" text="Добавьте API" icon={<IconApi stroke={2} />}/>
            )}
        </>
    )
}

export default BotsApiList;