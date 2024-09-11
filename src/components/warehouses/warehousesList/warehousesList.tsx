import {Paper, Table, Text} from "@mantine/core";
import {WarehouseItem} from "@/components/warehouses";
import EmptyData from "@/components/emptyData";
import {IconMapPinFilled} from "@tabler/icons-react";

const WarehousesList = ({ warehouses} : WarehousesListTypes) => {
    return (
        <>
            {warehouses.length > 0 ? (
                <Paper shadow="xs">
                    <Table>
                        <Table.Thead>
                        <Table.Tr>
                            <Table.Th w="30%">Город</Table.Th>
                            <Table.Th>Адрес</Table.Th>
                            {/*<Table.Th>Оформить заказ</Table.Th>*/}
                            <Table.Th w="1%">Действия</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                        {warehouses.map((warehouse : IWarehouse) => (
                            <WarehouseItem key={warehouse.id} warehouse={warehouse} />
                        ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            ) : (
                <EmptyData
                    text="Склад не создан"
                    subTitle="Добавьте адрес для формирования каталога склада"
                    icon={<IconMapPinFilled size={24}/>}
                />
            )}
        </>
    );
}

export default WarehousesList;