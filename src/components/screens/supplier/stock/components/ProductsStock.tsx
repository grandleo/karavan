import {Paper, Table} from "@mantine/core";
import QtyInputStock from "@/components/screens/supplier/stock/components/form/QtyInputStock";
import PriceInputStock from "@/components/screens/supplier/stock/components/form/PriceInputStock";

interface Props {
    products: [];
}

const ProductsStock = ({products} : Props) => {
    return (
        <>
        <Paper shadow="xs">
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>№</Table.Th>
                        <Table.Th>Наименование</Table.Th>
                        <Table.Th>На складе</Table.Th>
                        <Table.Th>Цена</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {products?.map((product: any, index: number) => {
                        return (
                            <ProductItem key={index} item={product} index={index+1}/>
                        )
                    })}
                </Table.Tbody>
            </Table>
        </Paper>
        </>
    )
}

interface ProductProps {
    item: any;
    index: number;
}

const ProductItem = ({item, index}: ProductProps) => {
    return (
        <>
            <Table.Tr>
                <Table.Td>{index}</Table.Td>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>
                    <QtyInputStock id={item.id} qty={item.qty}/>
                </Table.Td>
                <Table.Td>
                    <PriceInputStock id={item.id} price={item.price}/>
                </Table.Td>
            </Table.Tr>
        </>
    )
}

export default ProductsStock;