import {
    Badge,
    Box,
    Button,
    Card, Drawer,
    Flex, Grid,
    Group,
    NumberFormatter,
    Paper, ScrollArea,
    Table,
    Text, Timeline
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {
    IconClock,
    IconCircleFilled,
    IconCheck,
    IconMapPinFilled, IconDownload
} from '@tabler/icons-react';
import classes from "./orders.module.css";
import {useChangeStatusMutation, useGetOrderQuery} from "@/store/api/order.api";
import {IOrderProduct, IStatus} from "@/components/orders/types";
import EditQuantityProduct from "@/components/orders/form/EditQuantityProduct";
import DeleteProduct from "@/components/orders/form/DeleteProduct";
import OrderInfo from "@/components/orders/OrderInfo";
import WeightOrder from "@/components/orders/form/WeightOrder";
import DimensionsOrder from "@/components/orders/form/DimensionsOrder";
import RequirementOrder from "@/components/orders/form/RequirementOrder";
import {NoBids, SelectOrder} from "@/components/orders/DataEmpty";
import _ from "lodash";
import BidOrder from "@/components/orders/BidOrder";
import {modals} from "@mantine/modals";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

const Order = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const {data: order, isLoading} = useGetOrderQuery('');

    const [change] = useChangeStatusMutation();

    if(!order) {
        return <SelectOrder/>;
    }

    const countActiveStatus = _.countBy(order.status_history, 'active')['true'];

    const changeStatus = () => {
        if (order.required_dimension && (_.isEmpty(String(order.weight)) || _.isEmpty(order.dimensions))) {
            return RequiredDimensionModal()
        }

        change(order.number_id).unwrap()
            .then((payload) => {
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    const RequiredDimensionModal = () => modals.open({
        title: 'Указаны не все параметры заказа',
        children: (
            <>
                <Text size="sm">
                    Вы не указали вес и габариты заказа, укажите их и смените статус заказа.
                </Text>
                <Button fullWidth color="#2997A3" onClick={() => modals.closeAll()} mt="md">
                    Хорошо
                </Button>
            </>
        ),
    });

    return (
        <>
            <Paper radius="md" withBorder mb={10} w="100%">
                <Card>
                    <Card.Section p={16} withBorder>
                        <Group justify="space-between">
                            <Box>
                                <Text className={classes.orderNumber}>Заказ №{order.number_id}
                                    {/*от {order.date}*/}
                                </Text>

                                <Flex align="center" direction="row" gap={8}>
                                    <Flex align="center" direction="row" gap={6}>
                                        <Box style={{background: order.current_status.color}} className={classes.orderStatusIndicator}></Box>
                                        <Text className={classes.orderStatus}>
                                            {order.current_status.name}
                                        </Text>
                                    </Flex>

                                    <Box className={classes.orderStatusMore}>
                                        <Text className={classes.orderStatusMoreText} onClick={open}>Подробнее</Text>
                                    </Box>
                                </Flex>
                            </Box>
                            {order.change_status && (
                                <Box>
                                    <Button variant="filled" color="#2997A3" onClick={changeStatus}>{order.change_status_text}</Button>
                                </Box>
                            )}
                        </Group>
                    </Card.Section>
                    <Card.Section p={16}>
                        <Grid>
                            {order.required_dimension ? (
                                <>
                                    <Grid.Col span={3}>
                                        <WeightOrder number_id={order.number_id} weight={order.weight}/>
                                    </Grid.Col>

                                    <Grid.Col span={3}>
                                        <DimensionsOrder number_id={order.number_id} dimensions={order.dimensions}/>
                                    </Grid.Col>

                                    <Grid.Col span={6}>
                                        <RequirementOrder number_id={order.number_id} requirement={order.requirement} />
                                    </Grid.Col>
                                </>
                            ) : (
                                <>
                                    <Grid.Col span={3}>
                                        <OrderInfo text="Вес, кг" value={order.weight}/>
                                    </Grid.Col>

                                    <Grid.Col span={3}>
                                        <OrderInfo text="Габариты, мм" value={order.dimensions}/>
                                    </Grid.Col>

                                    <Grid.Col span={3}>
                                        <OrderInfo text="Крайний срок доставки" value={order.delivery_date}/>
                                    </Grid.Col>

                                    <Grid.Col span={3}>
                                        <OrderInfo text="Стоимость заказа" value={order.total_amount} numberFormat={true}/>
                                    </Grid.Col>

                                    <Grid.Col span={12}>
                                        <OrderInfo text="Требования к транспорту" value={order.requirement}/>
                                    </Grid.Col>
                                </>
                            )}
                        </Grid>
                    </Card.Section>
                </Card>
            </Paper>

            {!_.isEmpty(order.invoices) && (
                <Paper shadow="xs" radius="md" withBorder mb={10}>
                    <Card>
                        <Card.Section p={16} withBorder>
                            <Text className={classes.titleBlock}>Выставленные счета</Text>
                        </Card.Section>
                        <Card.Section >
                            <Table>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th pl={16} w={105} className={classes.nowrap}>№ Счета</Table.Th>
                                        <Table.Th w="100%" className={classes.nowrap}>Наименование услуги</Table.Th>
                                        <Table.Th w={100} className={classes.nowrap}>Кол-во</Table.Th>
                                        <Table.Th w={140} className={classes.nowrap}>Стоимость</Table.Th>
                                        <Table.Th w={120} className={classes.nowrap}>Статус</Table.Th>
                                        <Table.Th pr={16} className={classes.nowrap}></Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    <Table.Tr >
                                        <Table.Td pl={16}>
                                            <Text>15223</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text>Грузоперевозки медикаментов (15 кг)</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <NumberFormatter value={100} thousandSeparator=" " decimalSeparator="." suffix=" шт"/>
                                        </Table.Td>
                                        <Table.Td>
                                            <NumberFormatter value={1400} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color="#bbbbbb">Не оплачен</Badge>
                                        </Table.Td>
                                        <Table.Td pr={16}>
                                            <Group gap="xl" wrap="nowrap" justify="flex-end">
                                                <IconDownload/>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr >
                                        <Table.Td pl={16} w={95}>
                                            <Text>15223</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text>Грузоперевозки медикаментов (15 кг)</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <NumberFormatter value={100} thousandSeparator=" " decimalSeparator="." suffix=" шт"/>
                                        </Table.Td>
                                        <Table.Td>
                                            <NumberFormatter value={1400} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color="#bbbbbb">Не оплачен</Badge>
                                        </Table.Td>
                                        <Table.Td pr={16}>
                                            <Group gap="xl" wrap="nowrap" justify="flex-end">
                                                <Button color="#2997A3">Оплатить</Button>
                                                <IconDownload/>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </Card.Section>
                    </Card>
                </Paper>
            )}

            {order.choose_logistics_block && (
                <Paper shadow="xs" radius="md" withBorder mb={10}>
                    <Card>
                        <Card.Section p={16} withBorder>
                            <Text className={classes.titleBlock}>Ответы на заявку</Text>
                        </Card.Section>
                        <Card.Section p={16}>
                            <ScrollArea h={250}>
                                <Flex direction="column" gap={12}>
                                    {
                                        order.bids.length > 0 ?
                                            order.bids.map( (bid, index: number) => {
                                                return (
                                                    <BidOrder bid={bid} choose_logistics={order.choose_logistics} key={index}/>
                                                )
                                            } )
                                            :
                                            <NoBids/>
                                    }
                                </Flex>
                            </ScrollArea>
                        </Card.Section>
                    </Card>
                </Paper>
            )}

            {order.products.length > 0 && (
                <Paper shadow="xs" radius="md" withBorder mb={10}>
                    <Card>
                        <Card.Section p={16} withBorder>
                            <Text className={classes.titleBlock}>Состав заказа</Text>
                        </Card.Section>
                        <Card.Section>
                            <Table className={classes.products} highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th pl={16} w={60} className={classes.nowrap}>№</Table.Th>
                                        <Table.Th className={classes.nowrap}>Наименование</Table.Th>
                                        <Table.Th w={160} className={classes.nowrap}>Кол-во в заказе</Table.Th>
                                        <Table.Th pr={16} w={160} className={classes.nowrap}>Ваша цена</Table.Th>
                                        {order.edit_invoice && <Table.Th pr={16} w={40} ></Table.Th>}
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {order.products?.map( (product: IOrderProduct, index: number) => {
                                        return (
                                            <Table.Tr key={index}>
                                                <Table.Td pl={16}>
                                                    {index+1}
                                                </Table.Td>
                                                <Table.Td className={classes.name}>
                                                    {product.name}
                                                </Table.Td>
                                                <Table.Td>
                                                    {order.edit_invoice ? <EditQuantityProduct id={product.id} quantity={product.quantity}/> : <NumberFormatter value={product.quantity} thousandSeparator=" " decimalSeparator="." suffix=" шт"/>}
                                                </Table.Td>
                                                <Table.Td pr={16} className={classes.price}>
                                                    <NumberFormatter value={product.price} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/>
                                                </Table.Td>
                                                {order.edit_invoice &&
                                                    <Table.Td pr={16}>
                                                        <DeleteProduct id={product.id}/>
                                                    </Table.Td>
                                                }
                                            </Table.Tr>
                                        )
                                    })}
                                </Table.Tbody>
                                <Table.Tfoot className={classes.totalRow}>
                                    <Table.Tr>
                                        <Table.Td colSpan={2} pl={16} pr={16} ta="right" className={classes.total}>
                                            Итого:
                                        </Table.Td>
                                        <Table.Td className={classes.totalQuantity}>
                                            <NumberFormatter value={order.total_quantity} thousandSeparator=" " decimalSeparator="." suffix=" шт"/>
                                        </Table.Td>
                                        <Table.Td pr={16} className={classes.totalAmount}>
                                            <NumberFormatter value={order.total_amount} thousandSeparator=" " decimalSeparator="." suffix=" ₽"/>
                                        </Table.Td>
                                    </Table.Tr>
                                </Table.Tfoot>
                            </Table>
                        </Card.Section>
                    </Card>
                </Paper>
            )}

            <Drawer opened={opened} onClose={close} position="right" size="lg" title="Информация о заказе">
                <Box className={classes.statusHistory}>

                    {/*<Flex className={classes.contacts} direction="column" gap={12}>*/}
                    {/*    <Box className={classes.contact}>*/}
                    {/*        <Flex direction="column">*/}
                    {/*            <Text className={classes.type}>Контакты клиента:</Text>*/}
                    {/*            <Text className={classes.company}>{order.contacts.client.company}</Text>*/}
                    {/*        </Flex>*/}
                    {/*        <Flex gap={8}>*/}
                    {/*            <Text className={classes.name}>{order.contacts.client.name}</Text>*/}
                    {/*            <Text className={classes.phone}>{order.contacts.client.phone}</Text>*/}
                    {/*        </Flex>*/}
                    {/*    </Box>*/}
                    {/*    <Box className={classes.contact}>*/}
                    {/*        <Flex direction="column">*/}
                    {/*            <Text className={classes.type}>Контакты поставщика:</Text>*/}
                    {/*            <Text className={classes.company}>{order.contacts.supplier.company}</Text>*/}
                    {/*        </Flex>*/}
                    {/*        <Flex gap={8}>*/}
                    {/*            <Text className={classes.name}>{order.contacts.supplier.name}</Text>*/}
                    {/*            <Text className={classes.phone}>{order.contacts.supplier.phone}</Text>*/}
                    {/*        </Flex>*/}
                    {/*    </Box>*/}
                    {/*</Flex>*/}

                    {/*<Flex direction="column" gap={20} className={classes.statusHistoryAddress}>*/}
                    {/*    <Flex gap={8}>*/}
                    {/*        <Box className={classes.iconAddress}>*/}
                    {/*            <IconMapPinFilled/>*/}
                    {/*        </Box>*/}
                    {/*        <Box>*/}
                    {/*            <Text className={classes.titleAddress}>Адрес забора</Text>*/}
                    {/*            <Text className={classes.address}>{order.warehouses.supplier}</Text>*/}
                    {/*        </Box>*/}
                    {/*    </Flex>*/}
                    {/*    <Flex gap={8}>*/}
                    {/*        <Box className={classes.iconAddress}>*/}
                    {/*            <IconMapPinFilled/>*/}
                    {/*        </Box>*/}
                    {/*        <Box>*/}
                    {/*            <Text className={classes.titleAddress}>Адрес доставки</Text>*/}
                    {/*            <Text className={classes.address}>{order.warehouses.client}</Text>*/}
                    {/*        </Box>*/}
                    {/*    </Flex>*/}
                    {/*</Flex>*/}

                    <Timeline active={countActiveStatus-1} reverseActive bulletSize={24} lineWidth={2} color="#2997A3">
                        {order.status_history.map((status: IStatus, index: number) => {
                            return (
                                <Timeline.Item bullet={<IconClock size={16} />} lineVariant={status.active ? 'solid' : 'dashed'} key={index}>
                                    <Text className={classes.timeLineTitle}>{status.name}</Text>
                                    <Text className={classes.timeLineDate}>{status.date}</Text>
                                </Timeline.Item>
                            )
                        })}
                    </Timeline>
                </Box>
            </Drawer>
        </>
    )
}

export default Order;