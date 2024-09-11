import {WarehouseItemTypes} from "@/components/warehouses/warehouseItem/types";
import {ActionIcon, Table} from "@mantine/core";
import {useActions} from "@/hooks/useActions";
import {IconPencil, IconTrash} from "@tabler/icons-react";

const WarehouseItem = ({ warehouse} : WarehouseItemTypes) => {
    const {setWarehouseFormValues} = useActions();

    const handleEditClick = () => {
        setWarehouseFormValues(warehouse);
    };

    return (
        <Table.Tr>
            <Table.Td>{warehouse.city_name}</Table.Td>
            <Table.Td>{warehouse.address}</Table.Td>
            {/*<Table.Td>{warehouse.type_orders === 'cart' ? 'Произвольно' : 'По времени'}</Table.Td>*/}
            <Table.Td>
                <ActionIcon.Group>
                    <ActionIcon variant="transparent" color="rgba(0, 0, 0, 1)" aria-label="Редактировать"  onClick={handleEditClick}>
                        <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </ActionIcon.Group>
            </Table.Td>
        </Table.Tr>
    );
};

export default WarehouseItem;