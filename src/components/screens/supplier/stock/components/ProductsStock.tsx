import {Flex, Image, Paper, Table, Text} from "@mantine/core";
import QtyInputStock from "@/components/screens/supplier/stock/components/form/QtyInputStock";
import PriceInputStock from "@/components/screens/supplier/stock/components/form/PriceInputStock";
import {IconCalendar} from "@tabler/icons-react";
import {MonthPickerInput} from "@mantine/dates";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useAddProductForSupplierStockMutation} from "@/store/api/supplier/stockSupplier.api";
import {useSelector} from "react-redux";
import {getSupplierStock} from "@/store/slices/supplierStockSlice";
import _ from "lodash";
import classes from "@/components/screens/supplier/stock/components/stock.module.css";

interface Props {
    products: [];
}

const ProductsStock = ({products} : Props) => {
    const hasRequiredPeriodValidityOne = _.every(products, (item) => item.required_period_validity === 1);

    return (
        <>
            <Paper shadow="xs">
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>№</Table.Th>
                            <Table.Th>Наименование</Table.Th>
                            {hasRequiredPeriodValidityOne && (
                                <Table.Th>Срок годности</Table.Th>
                            )}
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
    const hasRequiredPeriodValidity = _.has(item, 'required_period_validity') && item.required_period_validity === 1;

    return (
        <>
            <Table.Tr>
                <Table.Td>{index}</Table.Td>
                <Table.Td>

                    <Flex gap={8} align="center">
                        {item.country_icon && (
                            <Image src={item.country_icon} width={18} height={18} fit="contain" alt={item.name}/>
                        )}
                        <Text className={classes.productName}>
                            {item.name}
                        </Text>
                    </Flex>

                </Table.Td>
                {hasRequiredPeriodValidity && (
                    <Table.Td>
                        <PeriodValidity id={item.id} period_validity={item.period_validity}/>
                    </Table.Td>
                )}
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

interface PeriodValidityProps {
    id: number,
    period_validity: Date
}

const PeriodValidity = ({id, period_validity} : PeriodValidityProps) => {
    const {selectedWarehouse} = useSelector(getSupplierStock);
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;  // +1, потому что в JavaScript месяцы нумеруются с 0 до 11
    let day = currentDate.getDate();

    const [date, setDate] = useState<Date | null>(new Date(year, month, day));

    const [addProductForStock] = useAddProductForSupplierStockMutation();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            product_id: 0,
            period_validity: new Date(year, month, day),
        }
    });

    useEffect(() => {
        setValue('product_id', id)

        if(period_validity) {
            setValue('period_validity', period_validity)
            setDate(new Date(period_validity))
        }
    }, [id, period_validity]);

    const onSubmit = (data: any) => {
        console.log(data.period_validity.toString())
        addProductForStock({
            'warehouse_id': selectedWarehouse,
            ...data
        }).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    };

    const setPeriodValidity = (data: any) => {
        setDate(data)
        setValue('period_validity', data)
        onSubmit(getValues())
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                render={({ field }) => (
                    <MonthPickerInput
                        leftSection={<IconCalendar stroke={1.5} />}
                        leftSectionPointerEvents="none"
                        placeholder="Срок годности"
                        value={date}
                        onChange={setPeriodValidity}
                        minDate={new Date(year, month, day)}
                        valueFormat="MM.YY"
                    />
                )}
                name="period_validity"
            />
        </form>
    )
}

export default ProductsStock;