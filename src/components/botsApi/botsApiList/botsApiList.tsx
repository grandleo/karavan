import {Paper, Table, Text} from "@mantine/core";
import {BotApiItem} from "@/components/botsApi";
import EmptyData from "@/components/emptyData";

const BotsApiList = ({apiBots, onDelete} : BotsApiListTypes) => {
    return (
        <>
            {apiBots.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Название</Table.Th>
                                <Table.Th w="1%">Username бота</Table.Th>
                                <Table.Th w="1%">Token</Table.Th>
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
                <EmptyData height="calc(100vh - 130px)" text="API нет, добавьте их"/>
            )}
        </>
    )
}

export default BotsApiList;