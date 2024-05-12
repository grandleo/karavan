import {SupplierStockItem} from "@/components/stock";
import {Paper, Table} from "@mantine/core";

const SupplierStockList = ({products}: SupplierStockListTypes) => {

    return (
        <>
            <Paper shadow="xs">
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={1}>№</Table.Th>
                            <Table.Th>Наименование</Table.Th>
                            <Table.Th w={1}>Кол-во</Table.Th>
                            <Table.Th w={1}>Ваша цена</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {products?.map((product, index) => {
                            return (
                                <SupplierStockItem
                                    key={product.id}
                                    index={index+1}
                                    item={product}
                                />
                            )
                        })}
                    </Table.Tbody>
                </Table>
            </Paper>
        </>
    )
}

export default SupplierStockList;