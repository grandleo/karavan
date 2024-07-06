import {Box, Button, Drawer, LoadingOverlay, Select, TextInput, Text, Radio, Group, Flex} from "@mantine/core";
import {Controller, FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import {useGetCitiesWarehouseQuery, useGetWarehouseRegionsQuery} from "@/store/api/warehouses.api";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getWarehouseState} from "@/store/slices/warehouseSlice";
import {useActions} from "@/hooks/useActions";
import classes from "@/components/warehouses/styles.module.css";
import {ErrorNotifications} from "@/helpers/Notifications";

const WarehouseForm = ({isOpen, onClose, onAddWarehouse, onEditWarehouse, onDelete}: WarehouseFormTypes) => {
    const {editValues} = useSelector(getWarehouseState);
    const {data: regions = [], isLoading: regionsLoading} = useGetWarehouseRegionsQuery('');
    const {control, handleSubmit, reset, setValue, watch, formState: {errors}} = useFormContext();
    const typeOrders = watch('type_orders');
    const {resetWarehouseFormValues} = useActions();
    const [isDeleting, setIsDeleting] = useState(false);

    const region_id = watch('region_id');
    const city_id = watch('city_id');
    const {data: cities = [], isLoading: citiesLoading} = useGetCitiesWarehouseQuery(region_id, {
        skip: region_id === null
    });

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        const warehouseData: IWarehouse = {
            id: data.id,
            region_id: data.region_id,
            city_id: data.city_id,
            address: data.address,
            type_orders: data.type_orders,
        };

        if (editValues) {
            onEditWarehouse(warehouseData);
        } else {
            onAddWarehouse(warehouseData);
        }
    };

    const handleClose = () => {
        resetWarehouseFormValues('');
        reset();
        onClose();
    }

    useEffect(() => {
        if (editValues && !regionsLoading && !citiesLoading) {
            setValue('id', editValues.id)
            setValue('region_id', String(editValues.region_id))
            setValue('city_id', String(editValues.city_id))
            setValue('address', editValues.address)
            setValue('type_orders', editValues.type_orders)
        }
    }, [editValues, regionsLoading, citiesLoading]);

    useEffect(() => {
        if (!region_id) {
            setValue('city_id', null);
            setValue('address', '');
        }
    }, [region_id, setValue]);

    useEffect(() => {
        setValue('address', '');
    }, [city_id, setValue]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            if (editValues) {
                await onDelete(editValues.id);
                handleClose();
            }
        } finally {
            setIsDeleting(false);
        }
    }

    const handleFormErrors = () => {
        ErrorNotifications('Заполните поля');
    };

    const sanitizeAddressInput = (input: string) => {
        // Remove leading spaces
        input = input.replace(/^\s+/g, '');
        // Remove consecutive spaces
        input = input.replace(/\s{2,}/g, ' ');
        // Allow only digits, Cyrillic characters, and ./-:, symbols
        input = input.replace(/[^\dА-Яа-я./\-:, ]/g, '');
        return input;
    };

    return (
        <Drawer.Root opened={isOpen}
                     onClose={handleClose}
                     position="right"
        >
            <Drawer.Overlay/>
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>{editValues ? 'Редактировать склад' : 'Добавить склад'}</Drawer.Title>
                    <Drawer.CloseButton className={classes.drawerCloseButton}/>
                </Drawer.Header>
                <Drawer.Body className={classes.drawerBody}>
                    <form onSubmit={handleSubmit(handleFormSubmit, handleFormErrors)}>

                        <Box p="relative">
                            <LoadingOverlay visible={regionsLoading || citiesLoading} zIndex={1000}
                                            overlayProps={{radius: "sm", blur: 2}}/>
                        </Box>
                        <Flex direction="column" style={{height: 'calc(100vh - 65px)'}}>
                            <Box style={{flex: 1}}>
                                <Box className={classes.bodyBlock}>
                                    <Controller
                                        name="region_id"
                                        control={control}
                                        rules={{
                                            required: "Область обязательно для выбора",
                                        }}
                                        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                                            <Select
                                                label="Область"
                                                placeholder="Выберите"
                                                checkIconPosition="right"
                                                searchable
                                                nothingFoundMessage="Ничего не найдено..."
                                                data={regions || []}
                                                clearable
                                                value={value}
                                                onBlur={onBlur}
                                                onChange={(value) => {
                                                    onChange(value);
                                                    setValue('city_id', null);
                                                }}
                                                error={error?.message}
                                                mb={15}
                                            />
                                        )}/>

                                    {region_id && (
                                        <Controller
                                            name="city_id"
                                            control={control}
                                            rules={{
                                                required: "Город или область обязательно нужно выбрать",
                                            }}
                                            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                                                <Select
                                                    label="Город или область"
                                                    placeholder="Выберите"
                                                    checkIconPosition="right"
                                                    searchable
                                                    nothingFoundMessage="Ничего не найдено..."
                                                    data={cities || []}
                                                    clearable
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={(value) => {
                                                        onChange(value);
                                                    }}
                                                    error={error?.message}
                                                    mb={15}
                                                />
                                            )}
                                        />
                                    )}

                                    {city_id && (
                                        <Controller
                                            name="address"
                                            control={control}
                                            rules={{
                                                required: "Адрес обязателен",
                                                minLength: { value: 3, message: "Минимальное количество символов - 3" },
                                                maxLength: { value: 100, message: "Максимальное количество символов - 100" }
                                            }}
                                            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                                                <TextInput
                                                    label="Улица"
                                                    placeholder="Введите название улицы"
                                                    onBlur={onBlur}
                                                    onChange={(event) => {
                                                        const sanitizedValue = sanitizeAddressInput(event.currentTarget.value);
                                                        onChange(sanitizedValue);
                                                    }}
                                                    value={value}
                                                    error={error?.message}
                                                />
                                            )}
                                        />

                                    )}
                                </Box>
                                <Box className={classes.bodyBlock}>
                                    <Text>Оформить заказ</Text>
                                    <Controller
                                        name="type_orders"
                                        control={control}
                                        rules={{required: "Тип заказов обязателен"}}
                                        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                                            <Radio.Group
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                error={error?.message}
                                                mb={15}
                                            >
                                                <Group mt="xs">
                                                    <Radio value="cart" label="Произвольно"/>
                                                    <Radio disabled value="control_point" label="По времени"/>
                                                </Group>
                                            </Radio.Group>
                                        )}
                                    />

                                    {typeOrders === 'cart' ?
                                        <Text mb={15}>Произвольно — клиент сам меняет статус своего заказа по нажатию на
                                            кнопку
                                            оформить заказ.</Text> :
                                        <Text mb={15}>По времени — клиент не может управлять своим заказом, смена
                                            статуса заказа
                                            меняться будет в определённое время</Text>}

                                    {typeOrders === 'control_point' && (
                                        <Controller
                                            name="control_point_time"
                                            control={control}
                                            rules={{required: "Время контрольной точки обязательно"}}
                                            render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                                                <TextInput
                                                    label="Время контрольной точки"
                                                    placeholder="Введите время"
                                                    onBlur={onBlur}
                                                    onChange={(event) => {
                                                        onChange(event.currentTarget.value);
                                                    }}
                                                    value={value}
                                                    error={error?.message}
                                                    mb={15}
                                                />
                                            )}
                                        />
                                    )}

                                </Box>
                            </Box>
                            {editValues && (
                                <Box className={classes.bodyBlock}>
                                    <Button variant="filled" color="red" fullWidth
                                            onClick={handleDelete} loading={isDeleting}>Удалить</Button>
                                </Box>
                            )}
                            <Box>
                                <Flex gap={16} className={`${classes.bodyBlock}`}>
                                    <Button variant="outline" fullWidth onClick={handleClose}>Отменить</Button>
                                    <Button fullWidth
                                            type="submit">{editValues ? 'Обновить склад' : 'Добавить склад'}</Button>
                                </Flex>
                            </Box>
                        </Flex>
                    </form>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}

export default WarehouseForm;