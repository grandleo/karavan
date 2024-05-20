import {Paper, Table} from "@mantine/core";
import SupplierClientItem from "@/components/clients/item/supplierClientItem";
import EmptyData from "@/components/emptyData";

const SupplierClientsList = ({clients, handleChangeStatus}: SupplierClientsListTypes) => {
    return (
        <>
            {clients.length > 0 ? (
                <>
                    <Paper shadow="xs">
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th w="1%">ID</Table.Th>
                                    <Table.Th>Имя</Table.Th>
                                    <Table.Th>Компания</Table.Th>
                                    <Table.Th>Телефон</Table.Th>
                                    <Table.Th>Chat ID</Table.Th>
                                    <Table.Th w="1%">Статус</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {clients.map((client : ISupplierClient) => (
                                    <SupplierClientItem key={client.id} data={client} handleChangeStatus={handleChangeStatus}/>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>

                </>
            ) : (
                <EmptyData height="calc(100vh - 130px)" text="Список клиентов пуст"/>
            )}

        </>
    )
}

export default SupplierClientsList;