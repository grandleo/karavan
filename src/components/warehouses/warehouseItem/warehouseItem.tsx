import {WarehouseItemTypes} from "@/components/warehouses/warehouseItem/types";
import {ActionIcon, Table} from "@mantine/core";
import {useActions} from "@/hooks/useActions";
import {IconPencil, IconTrash} from "@tabler/icons-react";

const WarehouseItem = ({ warehouse, onDelete } : WarehouseItemTypes) => {

    const {setWarehouseFormValues} = useActions();

    const handleEditClick = () => {
        setWarehouseFormValues(warehouse);
    };

    return (
        <Table.Tr>
            <Table.Td>{warehouse.city_name}</Table.Td>
            <Table.Td>{warehouse.address}</Table.Td>
            <Table.Td>
                <ActionIcon.Group>
                    <ActionIcon aria-label="Редактировать"  onClick={handleEditClick}>
                        <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color="red" aria-label="Удалить" onClick={() => onDelete(warehouse.id)}>
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </ActionIcon.Group>
            </Table.Td>
        </Table.Tr>
    );
};

export default WarehouseItem;