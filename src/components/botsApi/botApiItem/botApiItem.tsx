import {useActions} from "@/hooks/useActions";
import {ActionIcon, Table} from "@mantine/core";
import {IconPencil, IconTrash} from "@tabler/icons-react";

const BotApiItem = ({apiBot, onDelete} : BotApiItemTypes) => {
    const {setBotApiFormValues} = useActions();

    const handleEditClick = () => {
        setBotApiFormValues(apiBot)
    }

    return (
        <Table.Tr>
            <Table.Td>{apiBot.name}</Table.Td>
            <Table.Td>{apiBot.api}</Table.Td>
            <Table.Td>
                <ActionIcon.Group>
                    <ActionIcon aria-label="Редактировать"  onClick={handleEditClick}>
                        <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color="red" aria-label="Удалить" onClick={() => onDelete(apiBot.id)}>
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </ActionIcon.Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default BotApiItem;