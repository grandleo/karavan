import {Box, Button, Drawer, LoadingOverlay, Select, TextInput} from "@mantine/core";
import {Controller, FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import {useGetCitiesWarehouseQuery} from "@/store/api/warehouses.api";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {getWarehouseState} from "@/store/slices/warehouseSlice";
import {useActions} from "@/hooks/useActions";

const WarehouseForm = ({isOpen, onClose, onAddWarehouse, onEditWarehouse}: WarehouseFormTypes) => {
    const {editValues} = useSelector(getWarehouseState);
    const {data: cities = [], isLoading} = useGetCitiesWarehouseQuery('');
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useFormContext();

    const {resetWarehouseFormValues} = useActions();

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        const warehouseData: IWarehouse = {
            id: data.id,
            city_id: data.city_id,
            address: data.address,
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
        if (editValues) {
            setValue('id', editValues.id)
            setValue('city_id', String(editValues.city_id))
            setValue('address', editValues.address)
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
                    <Button fullWidth={true} type="submit">{editValues ? 'Обновить склад' : 'Добавить склад'}</Button>
                </form>
            </Box>
        </Drawer>
    )
}

export default WarehouseForm;