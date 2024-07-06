import {useActions} from "@/hooks/useActions";
import {ActionIcon, Switch, Table} from "@mantine/core";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import {ChangeEvent} from "react";

const BotApiItem = ({apiBot, onDelete, handleToggleActiveBotApi} : BotApiItemTypes) => {
    const {setBotApiFormValues} = useActions();

    const handleEditClick = () => {
        setBotApiFormValues(apiBot)
    }

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        handleToggleActiveBotApi({ ...apiBot, active: event.currentTarget.checked });
    }

    const warehouseLabels = apiBot.warehouses.map(warehouse => warehouse.label).join(', ');

    return (
        <Table.Tr>
            <Table.Td>
                <Switch
                    checked={apiBot.active}
                    onChange={handleToggle}
                />
            </Table.Td>
            <Table.Td>{apiBot.name}</Table.Td>
            <Table.Td>{warehouseLabels}</Table.Td>
            <Table.Td>
                <ActionIcon.Group>
                    <ActionIcon variant="transparent" color="rgba(0, 0, 0, 1)" aria-label="Редактировать"  onClick={handleEditClick}>
                        <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </ActionIcon.Group>
            </Table.Td>
        </Table.Tr>
    );
}

export default BotApiItem;