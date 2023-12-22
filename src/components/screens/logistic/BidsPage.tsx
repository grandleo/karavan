'use client'

import {useGetOrdersForLogisticQuery} from "@/store/api/logistic/orders.api";
import SimplePage from "@/components/ui/page/SimplePage";
import {Button, NumberInput, Paper, Table} from "@mantine/core";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useAddBidMutation, useRemoveBidMutation} from "@/store/api/logistic/bids.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import _ from "lodash";

const BidsPage = () => {
    const {data: orders} = useGetOrdersForLogisticQuery('');

    return (
        <>
            <SimplePage title="Тендеры на перевозку">
                {orders?.length > 0 ?
                    <Paper shadow="xs">
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Позгрузка</Table.Th>
                                    <Table.Th>Выгрузка</Table.Th>
                                    <Table.Th>Требования к транспорту</Table.Th>
                                    <Table.Th>Вес, кг / объём,м³</Table.Th>
                                    <Table.Th>Лучшая цена</Table.Th>
                                    <Table.Th>Ваша цена</Table.Th>
                                    <Table.Th>Предложить доставку</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {orders?.map((order: any, index:number) => {
                                    return (
                                        <Bid order={order} key={index}/>
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                    : "Нет заказаов"
                }
            </SimplePage>
        </>
    )
}

const Bid = ({order}: any) => {
    const [disable, setDisable] = useState(true);
    const [lock, setLock] = useState(false);

    const [addBid] = useAddBidMutation();
    const [removeBid] = useRemoveBidMutation();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            order_number_id: order.number_id,
            price: order.price,
        }
    });

    const changePrice = (number: string | number) => {
        setValue('price', Number(number));
        const price = getValues('price');

        setDisable(price <= 0);
    }

    const onSubmit = () => {
        const values = getValues();

        addBid(values).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    }

    const remove = () => {
        const values = getValues();

        removeBid(values).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error));
    }

    useEffect(() => {
        setLock(order?.has_bid)
    }, [order]);

    return (
        <Table.Tr>
            <Table.Td>
                {order.warehouse_supplier}
            </Table.Td>
            <Table.Td>
                {order.warehouse_client}
            </Table.Td>
            <Table.Td>

            </Table.Td>
            <Table.Td>
                Вес: 15 кг, Габариты: 400 x 400 x 400 мм
            </Table.Td>
            <Table.Td>
                {order.best_price}
            </Table.Td>
            <Table.Td>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <NumberInput
                                placeholder="0"
                                rightSection="₽"
                                disabled={lock}
                                value={value}
                                onBlur={onBlur}
                                onChange={changePrice}
                            />)}
                    />
                </form>
            </Table.Td>
            <Table.Td>
                {order?.has_bid ? <Button variant="filled" onClick={remove}>Отменить</Button> : <Button variant="filled" disabled={disable} onClick={onSubmit}>Предложить</Button>}
            </Table.Td>
        </Table.Tr>
    )
}

export default BidsPage;