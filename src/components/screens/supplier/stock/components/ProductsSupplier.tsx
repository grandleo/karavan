import {Badge, NumberInput, Table, Text} from "@mantine/core";
import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useAddProductForSupplierStockMutation} from "@/store/api/supplier/stockSupplier.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import QtyInputStock from "@/components/screens/supplier/stock/components/form/QtyInputStock";
import PriceInputStock from "@/components/screens/supplier/stock/components/form/PriceInputStock";
import classes from "./stock.module.css";
import {MonthPicker, MonthPickerInput} from "@mantine/dates";
import dayjs from "dayjs";
import {IconCalendar} from "@tabler/icons-react";

interface Props {
    products: []
}

const ProductsSupplier = ({products}: Props) => {
    return (
        <>
            <Table className={classes.productsTable}>
                <Table.Thead className={classes.tableHead}>
                    <Table.Tr>
                        <Table.Th>№</Table.Th>
                        <Table.Th>Наименование</Table.Th>
                        <Table.Th>На складе</Table.Th>
                        <Table.Th>Лучшая цена</Table.Th>
                        <Table.Th>Цена</Table.Th>
                        <Table.Th>Рейтинг</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody className={classes.tableTdoby}>
                    {products?.map((product: any, index: number) => {

                        return (
                            <ProductItem key={index} item={product} index={index+1}/>
                        )
                    })}
                </Table.Tbody>
            </Table>
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
                <Table.Td>
                    <Text className={classes.productIndex}>
                        {index}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Text className={classes.productName}>
                        {item.product_name}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <QtyInputStock id={item.product_id} qty={item.qty}/>
                </Table.Td>
                <Table.Td>
                    <Text className={classes.bestPrice}>{item.best_price} ₽</Text>
                </Table.Td>
                <Table.Td>
                    <PriceInputStock id={item.product_id} price={item.price} new_price={item.new_price}/>
                </Table.Td>
                <Table.Td>
                    <RatingProduct rating={item.rating}/>
                </Table.Td>
            </Table.Tr>
        </>
    )
}

const RatingProduct = ({rating}: any) => {

    let color = "#22C55E";

    switch (rating) {
        case 1:
            color = "#22C55E";
            break;
        case 2:
            color = "#D97706";
            break;
        default:
            color = "#98989f";
            break;
    }

    return (
        <Badge color={color}>{rating}</Badge>
    )
}

const ProductQty = ({id, qty}: any) => {
    const {selectedWarehouse} = useSelector(getSupplierStock);
    const [valueQty, setValueQty] = useState<string | number>(0);

    useEffect(() => {
        setValueQty(qty)
    }, [qty]);

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            product_id: id,
            qty: valueQty ?? '',
        }
    });

    const [addProductForStock] = useAddProductForSupplierStockMutation();

    const onChangeInput = (qtyInput: number) => {
        setValueQty(qtyInput);
        setValue('qty', qtyInput);
    }

    const onSubmit = (data: any) => {
        addProductForStock({
            'warehouse_id': selectedWarehouse,
            ...data
        }).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                render={() => (
                    <NumberInput
                        placeholder="0"
                        value={valueQty}
                        min={0}
                        max={9999}
                        onChange={onChangeInput}
                    />
                )}
                name="qty"
            />
        </form>
    )
}


const ProductPrice = ({id, price}: any) => {
    const {selectedWarehouse} = useSelector(getSupplierStock);
    const [valuePrice, setValuePrice] = useState<string | number>(0);

    useEffect(() => {
        setValuePrice(price)
    }, [price]);

    const [addProductForStock] = useAddProductForSupplierStockMutation();

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            product_id: id,
            price: valuePrice ?? '',
        }
    });

    const onChangeInput = (priceInput: number) => {
        setValuePrice(priceInput);
        setValue('price', priceInput);
    }

    const onSubmit = (data: any) => {
        addProductForStock({
            'warehouse_id': selectedWarehouse,
            ...data
        }).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                render={() => (
                    <NumberInput
                        placeholder="0"
                        value={valuePrice}
                        min={0}
                        max={9999}
                        onChange={onChangeInput}
                    />
                )}
                name="price"
            />
        </form>
    )
}

export default ProductsSupplier;