import {Paper, Table, Text} from "@mantine/core";
import {BotApiItem} from "@/components/botsApi";

const BotsApiList = ({apiBots, onDelete} : BotsApiListTypes) => {
    return (
        <>
            {apiBots.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w="30%">Название</Table.Th>
                                <Table.Th>API</Table.Th>
                                <Table.Th w="1%">Действия</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {apiBots.map((api : IBotType) => (
                                <BotApiItem key={api.id} apiBot={api} onDelete={onDelete} />
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <Text>API нет, добавьте их</Text>
            )}
        </>
    )
}

export default BotsApiList;