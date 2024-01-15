import {useSelector} from "react-redux";
import {getStock} from "@/store/slices/stockSlice";
import {useGetProductsCityCategoryQuery} from "@/store/api/stock";
import {useParams} from "next/navigation";
import {IProduct} from "@/components/client-stock/types";
import ProductClientStock from "@/components/client-stock/ui/ProductClientStock";
import {Paper, Table, Text} from "@mantine/core";
import {SelectCategory} from "@/components/client-stock/ui/DataEmpty";
import classes from "../client-stock.module.css";

const ProductsClientStock = () => {
    const {id} = useParams<{ id: string; }>();
    const {choseCategory} = useSelector(getStock);

    const {data: products, isLoading} = useGetProductsCityCategoryQuery({
        'city_id': id,
        'category_id': choseCategory,
    });

    return (
        <>
            {products?.length > 0 ?
            <Paper withBorder>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className={classes.nowrap}>
                                <Text>Наименование</Text>
                            </Table.Th>
                            <Table.Th w={200} className={classes.nowrap}>
                                <Text>Торг. особеность</Text>
                            </Table.Th>
                            <Table.Th w={120} className={classes.nowrap}>
                                <Text>В наличии</Text>
                            </Table.Th>
                            <Table.Th w={120} className={classes.nowrap}>
                                <Text>Цена</Text>
                            </Table.Th>
                            <Table.Th w={120} className={classes.nowrap}>
                                <Text>Кол-во</Text>
                            </Table.Th>
                            <Table.Th w="1%"></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {products?.map((product: IProduct, index: number) => {
                            return (
                                <ProductClientStock product={product} key={index}/>
                            )
                        })}
                    </Table.Tbody>
                </Table>
            </Paper>
            : <SelectCategory/>}
        </>
    )
}

export default ProductsClientStock;