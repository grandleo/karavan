'use client'

import {useGetOrdersForLogisticQuery} from "@/store/api/logistic/orders.api";
import SimplePage from "@/components/ui/page/SimplePage";
import {Button, NumberInput, Paper, Radio, Table, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useAddBidMutation, useRemoveBidMutation} from "@/store/api/logistic/bids.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import _ from "lodash";
import {modals} from "@mantine/modals";
import {DateInput} from "@mantine/dates";
import dayjs from 'dayjs';

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
            date: dayjs(new Date()).add(1, 'day').format("DD.MM.YYYY"),
            time: "с 9:00 до 13:00"
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
        modals.closeAll()
    }

    const RequiredDimensionModal = () => modals.open({
        title: 'Отклик на заявку',
        children: (
            <>
                <DateInput
                    locale="ru"
                    minDate={dayjs(new Date()).add(1, 'day').toDate()}
                    maxDate={dayjs(new Date()).add(3, 'day').toDate()}
                    valueFormat="DD.MM.YYYY"
                    defaultValue={dayjs(new Date()).add(1, 'day').toDate()}
                    label="Дата доставки"
                    onChange={(data) => {setValue('date', dayjs(data).format("DD.MM.YYYY"))}}
                    mb={12}
                />
                <Controller
                    name="time"
                    control={control}
                    render={({ field: { value } }) => (
                        <Radio.Group
                            name="favoriteFramework"
                            label="Период доставки"
                            mb={12}
                            value={value}
                            onChange={ (data) => { setValue('time', data) } }
                        >
                            <Radio value="с 9:00 до 13:00" label="с 9:00 до 13:00" mt={8}/>
                            <Radio value="с 13:00 до 16:00" label="с 13:00 до 16:00" mt={8}/>
                            <Radio value="с 16:00 до 20:00" label="с 16:00 до 20:00" mt={8}/>
                        </Radio.Group>
                    )}
                />
                {/*<Button fullWidth color="#2997A3" onClick={() => modals.closeAll()} mt="md">*/}
                <Button fullWidth color="#2997A3" onClick={onSubmit} mt="md">
                    Откликнуться
                </Button>
            </>
        ),
    });

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
                {order.requirement}
            </Table.Td>
            <Table.Td>
                Вес: {order.weight} кг, Габариты: {order.dimensions}
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
                {order?.has_bid ? <Button variant="filled" onClick={remove}>Отменить</Button> : <Button variant="filled" disabled={disable} onClick={RequiredDimensionModal}>Предложить</Button>}
            </Table.Td>
        </Table.Tr>
    )
}

export default BidsPage;