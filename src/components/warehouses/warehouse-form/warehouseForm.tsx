import {Box, Button, Drawer, LoadingOverlay, Select, TextInput, Text} from "@mantine/core";
import {Controller, FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import {useGetCitiesWarehouseQuery} from "@/store/api/warehouses.api";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {getWarehouseState} from "@/store/slices/warehouseSlice";
import {useActions} from "@/hooks/useActions";

const WarehouseForm = ({isOpen, onClose, onAddWarehouse, onEditWarehouse}: WarehouseFormTypes) => {
    const {editValues} = useSelector(getWarehouseState);
    const {data: cities = [], isLoading} = useGetCitiesWarehouseQuery('');
    const {control, handleSubmit, reset, setValue, formState: {errors}, watch} = useFormContext();
    const typeOrders = watch('type_orders');
    const {resetWarehouseFormValues} = useActions();

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        const warehouseData: IWarehouse = {
            id: data.id,
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
        console.log(editValues)
        if (editValues) {
            setValue('id', editValues.id)
            setValue('city_id', String(editValues.city_id))
            setValue('address', editValues.address)
            setValue('type_orders', editValues.type_orders)
        }
    }, [editValues]);

    return (
        <Drawer opened={isOpen}
                onClose={handleClose}
                position="right"
                title={editValues ? 'Редактировать склад' : 'Добавить склад'}
        >
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>

                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Controller
                        name="city_id"
                        control={control}
                        rules={{
                            required: "Город или область обязательно нужно выбрать",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
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
                                error={errors?.city_id?.message ? String(errors?.city_id?.message) : undefined}
                                mb={15}
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        rules={{
                            required: "Адрес обязателен",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Улица"
                                placeholder="Введите адрес"
                                onBlur={onBlur}
                                onChange={(event) => {
                                    onChange(event.currentTarget.value);
                                }}
                                value={value}
                                error={errors?.address?.message ? String(errors?.address?.message) : undefined}
                            />
                        )}
                    />
                    <Controller
                        name="type_orders"
                        control={control}
                        rules={{ required: "Тип заказов обязателен" }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <Select
                                label="Тип заказов"
                                description={
                                    <>
                                        <Text span size="sm"><Text span fw={700}>Корзина</Text> - клиент сам меняет
                                            статус своего заказа по нажатию на кнопку оформить заказ. </Text> <br/>
                                        <Text span size="sm"><Text span fw={700}>Контрольная точка</Text> - клиент не
                                            может управлять своим заказом, смена статуса заказа меняться будет в
                                            определённое время</Text>
                                    </>
                                }
                                placeholder="Выберите тип заказа"
                                data={[
                                    {value: 'cart', label: 'Корзина'},
                                    {value: 'control_point', label: 'Контрольная точка', disabled: true},
                                ]}
                                clearable
                                checkIconPosition="right"
                                value={value}
                                onBlur={onBlur}
                                onChange={(value) => {
                                    onChange(value);
                                }}
                                error={errors?.type_orders?.message ? String(errors?.type_orders?.message) : undefined}
                                mb={15}
                            />
                        )}
                    />
                    {typeOrders === 'control_point' && (
                        <Controller
                            name="control_point_time"
                            control={control}
                            rules={{ required: "Время контрольной точки обязательно" }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    label="Время контрольной точки"
                                    placeholder="Введите время"
                                    onBlur={onBlur}
                                    onChange={(event) => {
                                        onChange(event.currentTarget.value);
                                    }}
                                    value={value}
                                    error={errors?.control_point_time?.message ? String(errors?.control_point_time?.message) : undefined}
                                    mb={15}
                                />
                            )}
                        />
                    )}
                    <Button fullWidth={true} type="submit">{editValues ? 'Обновить склад' : 'Добавить склад'}</Button>
                </form>
            </Box>
        </Drawer>
    )
}

export default WarehouseForm;