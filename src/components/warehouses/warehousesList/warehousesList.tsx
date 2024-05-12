import {Paper, Table, Text} from "@mantine/core";
import {WarehouseItem} from "@/components/warehouses";

const WarehousesList = ({ warehouses, onDelete } : WarehousesListTypes) => {
    return (
        <>
            {warehouses.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                        <Table.Tr>
                            <Table.Th w="30%">Город</Table.Th>
                            <Table.Th>Адрес</Table.Th>
                            <Table.Th w="1%">Действия</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                        {warehouses.map((warehouse : IWarehouse) => (
                            <WarehouseItem key={warehouse.id} warehouse={warehouse} onDelete={onDelete} />
                        ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <Text>Складов нет, добавьте их</Text>
            )}
        </>
    );
}

export default WarehousesList;