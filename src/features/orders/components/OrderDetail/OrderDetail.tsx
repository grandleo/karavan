import {
    Button,
    Divider,
    Flex,
    Group,
    Image,
    Modal,
    NumberFormatter,
    Select,
    SelectProps,
    Table,
    Text
} from "@mantine/core";
import {IconCheck, IconDownload} from "@tabler/icons-react";
import classes from "./OrderDetail.module.css";
import {useSupplierUpdateOrderStatusMutation} from "@/features/orders/api/ordersApi";
import {useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {notify} from "@/utils/notify";

interface OrderDetailProps {
    orderDetails: IOrderDetail; // Здесь можно уточнить тип данных, если структура известна
    deliveryStatuses: OrderDetailStatuses[]; // Массив статусов доставки
    paymentStatuses: OrderDetailStatuses[]; // Массив статусов оплаты
}

interface IOrderDetail {
    id: number;
    client_id: number;
    client_name: string;
    order_date: string;
    delivery_order_status_id: number;
    payment_order_status_id: number;
    payment_supplier_order_status_id: number;
    total_sum: number;
    total_percent_sum: number;
    total_sum_with_percent: number;
    total_quantity: number;
    order_items: OrderDetailItems[];
}

interface OrderDetailItems {
    product_name: string;
    price: number;
    price_with_percent: number;
    quantity: number;
    total_price: number;
    percent: number;
    total_price_with_percent: number;
}

interface OrderDetailStatuses {
    id: string;
    name: string;
    image_url: string;
}

const OrderDetail = ({ orderDetails, deliveryStatuses, paymentStatuses }: OrderDetailProps) => {
    const { trans } = useTranslation();

    // Хук для вызова мутации смены статуса
    const [updateOrderStatus] = useSupplierUpdateOrderStatusMutation();

    // Состояние для модального окна
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);
    const [statusType, setStatusType] = useState<'delivery' | 'payment' | null>(null);

    const handleStatusChange = (status_id: string, type: 'delivery' | 'payment') => {
        setSelectedStatusId(status_id);
        setStatusType(type);
        setModalOpen(true); // Открываем модальное окно
    };

    const confirmStatusChange = async () => {
        if (selectedStatusId && statusType) {
            try {
                // Ожидаем ответ от сервера
                const response = await updateOrderStatus({ id: orderDetails.id, status_id: selectedStatusId }).unwrap();

                // Показываем уведомление с ответом от бэка
                notify(response.message || 'Статус успешно обновлен!', 'success');
            } catch (error: any) {
                console.error("Ошибка при обновлении статуса", error);

                // Показываем ошибку от бэка (если есть)
                const errorMessage = error?.data?.message || 'Ошибка при обновлении статуса';
                notify(errorMessage, 'error');
            }
        }
        setModalOpen(false); // Закрываем модальное окно после обновления
    };

    const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
        <Group wrap="nowrap">
            <Image src={option.image_url} alt={option.label} width={16} height={16}/>
            <span>{option.label}</span>
            {checked && <IconCheck style={{marginLeft: 'auto'}}/>}
        </Group>
    );

    // Форматируем данные для селектов
    const deliveryOptions = deliveryStatuses?.map(status => ({
        value: status.id.toString(),
        label: status.name,
        image_url: status.image_url
    }));

    const paymentOptions = paymentStatuses?.map(status => ({
        value: status.id.toString(),
        label: status.name,
        image_url: status.image_url
    }));

    // Находим выбранные изображения для статусов
    const selectedDeliveryImage = deliveryOptions?.find(option => option.value === orderDetails.delivery_order_status_id.toString())?.image_url;
    const selectedPaymentImage = paymentOptions?.find(option => option.value === orderDetails.payment_supplier_order_status_id.toString())?.image_url;

    return (
        <>
            <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={trans('orders', 'supplier.change_status.title')}>
                <Text>
                    {statusType === 'delivery'
                        ? trans('orders', 'supplier.change_status.change_delivery')
                        : trans('orders', 'supplier.change_status.change_payment')
                    }
                </Text>
                <Group p="right" mt="md">
                    <Button onClick={confirmStatusChange} variant="filled" color="blue">
                        {trans('buttons', 'confirm')}
                    </Button>
                    <Button onClick={() => setModalOpen(false)} variant="outline">
                        {trans('buttons', 'cancel')}
                    </Button>
                </Group>
            </Modal>

            <Flex justify="space-between" align="center">
                <Text className={classes.orderDetailClientId}>ID: {orderDetails.client_id}</Text>
                <Text className={classes.orderDetailNumberId}>№ {orderDetails.id}</Text>
            </Flex>
            <Flex justify="space-between" align="center">
                <Flex align="center">
                    {/*<Text className={classes.orderDetailClientName}>{orderDetails.client_name}</Text>*/}
                    {/*<Divider orientation="vertical" ml={8} mr={8}/>*/}
                    <Select
                        variant="unstyled"
                        data={deliveryOptions}
                        value={orderDetails.delivery_order_status_id.toString()}
                        onChange={(value) => handleStatusChange(value, 'delivery')}
                        checkIconPosition="left"
                        renderOption={renderSelectOption}
                        leftSection={
                            <Image
                                src={selectedDeliveryImage || ''}
                                alt="Selected option"
                                width={16}
                                height={16}
                            />
                        }
                    />
                    <Divider orientation="vertical" ml={8} mr={8}/>
                    <Select
                        variant="unstyled"
                        data={paymentOptions}
                        value={orderDetails.payment_supplier_order_status_id.toString()}
                        onChange={(value) => handleStatusChange(value, 'payment')}
                        checkIconPosition="left"
                        renderOption={renderSelectOption}
                        leftSection={
                            <Image
                                src={selectedPaymentImage || ''}
                                alt="Selected option"
                                width={16}
                                height={16}
                            />
                        }
                    />
                    {/*<Divider orientation="vertical" ml={8} mr={8}/>*/}
                    {/*<Button variant="white" disabled>{trans('buttons', 'more')} {trans('global', 'soon')}</Button>*/}
                </Flex>
                <Text className={classes.orderDetailDate}>от {orderDetails.order_date}</Text>
            </Flex>
            <Divider mt={8} mb={24}/>
            <Flex justify="space-between" align="center">
                <Text className={classes.structureOrder}>{trans('orders', 'supplier.products.title')}</Text>
                <Button variant="white" leftSection={<IconDownload stroke={2}/>} disabled>
                    {trans('orders', 'supplier.buttons.invoice')} {trans('global', 'soon')}
                </Button>
            </Flex>
            <Divider mt={8} mb={8}/>
            <Table stickyHeader>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>{trans('orders', 'supplier.products.table.number')}</Table.Th>
                        <Table.Th>{trans('orders', 'supplier.products.table.name')}</Table.Th>
                        <Table.Th>{trans('orders', 'supplier.products.table.quantity')}</Table.Th>
                        <Table.Th>{trans('orders', 'supplier.products.table.price')}</Table.Th>
                        <Table.Th>%</Table.Th>
                        <Table.Th>{trans('orders', 'supplier.products.table.cost')}</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {orderDetails?.order_items.map((item: any, index: number) => {
                        return (
                            <Table.Tr key={index}>
                                <Table.Td>{index+1}</Table.Td>
                                <Table.Td>
                                    <Text className={classes.productName}>
                                        {item.product_name}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <NumberFormatter
                                        value={item.quantity}
                                        thousandSeparator=" "
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <NumberFormatter
                                        prefix={orderDetails.currency.prefix ? orderDetails.currency.prefix : ''}
                                        suffix={orderDetails.currency.suffix ? orderDetails.currency.suffix : ''}
                                        value={item.price}
                                        thousandSeparator=" "
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <NumberFormatter
                                        prefix={orderDetails.currency.prefix ? orderDetails.currency.prefix : ''}
                                        suffix={orderDetails.currency.suffix ? orderDetails.currency.suffix : ''}
                                        value={item.percent}
                                        thousandSeparator=" "
                                    />
                                </Table.Td>
                                <Table.Td>
                                    <NumberFormatter
                                        prefix={orderDetails.currency.prefix ? orderDetails.currency.prefix : ''}
                                        suffix={orderDetails.currency.suffix ? orderDetails.currency.suffix : ''}
                                        value={item.total_price_with_percent}
                                        thousandSeparator=" "
                                    />
                                </Table.Td>
                            </Table.Tr>
                        )
                    })}
                </Table.Tbody>
                <Table.Tfoot>
                    <Table.Tr>
                        <Table.Td colSpan={2}>{trans('orders', 'supplier.products.table.total')}</Table.Td>
                        <Table.Td colSpan={3}>
                            <NumberFormatter value={orderDetails.total_quantity} thousandSeparator=" "/>
                        </Table.Td>
                        <Table.Td>
                            <NumberFormatter
                                prefix={orderDetails.currency.prefix ? orderDetails.currency.prefix : ''}
                                suffix={orderDetails.currency.suffix ? orderDetails.currency.suffix : ''}
                                value={orderDetails.total_sum_with_percent}
                                thousandSeparator=" "
                            />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tfoot>
            </Table>

        </>
    )
}

export default OrderDetail;