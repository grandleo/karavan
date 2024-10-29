import {
    Group,
    Radio,
    Select,
    TextInput,
    Text,
    Box,
    Button,
    Fieldset,
    ActionIcon,
    Flex,
    NumberInput
} from "@mantine/core";
import classes from "./FastCreateWarehouse.module.css";
import {Controller, FormProvider} from "react-hook-form";
import {IconX} from "@tabler/icons-react";
import useWarehouseForm from "@/features/warehouses/hooks/useWarehouseForm";

interface FastCreateWarehouseProps {
    onClose: () => void;
    mode: 'add' | 'edit';
    initialData?: any;
}

const FastCreateWarehouse = ({ onClose, mode, initialData }: FastCreateWarehouseProps) => {
    const {
        methods,
        onSubmit,
        isCreating,
        isUpdating,
        regionsData,
        filteredCities,
        selectedRegionId,
    } = useWarehouseForm({
        mode,
        initialData,
        onSuccess: onClose,
    });

    const { control } = methods;

    return (
        <>
            <FormProvider {...methods}>
                <Box className={classes.wrapper}>
                    <Flex justify="space-between" align="center">
                        <Text className={classes.title}>
                            {mode === 'add' ? 'Создание склада' : 'Обновление склада'}
                        </Text>
                        <ActionIcon onClick={onClose}>
                            <IconX size={16} />
                        </ActionIcon>
                    </Flex>
                    <form onSubmit={onSubmit}>
                        <Fieldset legend="Адрес" variant="unstyled">
                            <Controller
                                name="region_id"
                                control={control}
                                rules={{required: "Выбор региона обязателен."}}
                                render={({field: {value, onChange}, fieldState: {error}}) => (
                                    <Select
                                        label="Область"
                                        placeholder="Выберите область"
                                        data={regionsData}
                                        value={value}
                                        onChange={(newValue) => {
                                            onChange(newValue);
                                            methods.setValue("city_id", null); // Сбросить city_id при изменении региона
                                        }}
                                        clearable
                                        error={error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="city_id"
                                control={control}
                                rules={{required: "Выбор города обязателен."}}
                                render={({field: {value, onChange}, fieldState: {error}}) => (
                                    <Select
                                        label="Город"
                                        placeholder="Выберите город"
                                        data={filteredCities}
                                        value={value}
                                        onChange={onChange}
                                        clearable
                                        disabled={!selectedRegionId}
                                        error={error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="address"
                                control={methods.control}
                                rules={{
                                    required: "Это поле обязательно.",
                                }}
                                render={({field: {value, onChange}, fieldState: {error}}) => {
                                    return (
                                        <TextInput
                                            value={value}
                                            onChange={onChange}
                                            label="Улица"
                                            placeholder="Укажите улицу"
                                            rightSection={
                                                <ActionIcon
                                                    variant="white"
                                                    color="#1B1F3B59"
                                                    aria-label="Очистить"
                                                    onClick={() => onChange('')}
                                                    style={{display: value ? 'block' : 'none'}}
                                                >
                                                    <IconX style={{width: '70%', height: '70%'}} stroke={2}/>
                                                </ActionIcon>
                                            }
                                            error={error?.message}
                                        />
                                    )
                                }}
                            />

                        </Fieldset>
                        <Fieldset legend="Настройки доставки" variant="unstyled" mt={15} mb={15}>
                            <Controller
                                name="delivery_day"
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        if (value === null || value === undefined || value === '') {
                                            return true; // Allow empty value
                                        }
                                        return value >= 1 || "День доставки должен быть 1 или выше.";
                                    },
                                }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <NumberInput
                                        label="Кол-во дней доставки"
                                        placeholder="Укажите кол-во"
                                        value={value}
                                        onChange={(val) => onChange(val)}
                                        min={1}
                                        // Allow the field to be cleared by setting value to null
                                        clearable
                                        rightSection={
                                            value ? (
                                                <ActionIcon
                                                    variant="white"
                                                    color="#1B1F3B59"
                                                    aria-label="Очистить"
                                                    onClick={() => onChange(null)}
                                                    style={{ display: 'block' }}
                                                >
                                                    <IconX style={{ width: '70%', height: '70%' }} stroke={2} />
                                                </ActionIcon>
                                            ) : null
                                        }
                                        error={error?.message}
                                        // Optional: You can adjust the step and precision as needed
                                        step={1}
                                        precision={0}
                                    />
                                )}
                            />
                        </Fieldset>
                        <Fieldset legend="Оформить заказ" variant="unstyled">
                            <Controller
                                name="type_orders"
                                control={control}
                                render={({field}) => (
                                    <Radio.Group {...field} name="type_orders">
                                        <Group mt="xs">
                                            <Radio value="cart" label="Произвольно"/>
                                            <Radio value="control_point" label="По времени" disabled/>
                                        </Group>
                                    </Radio.Group>
                                )}
                            />
                        </Fieldset>

                        <Text>
                            Произвольно — клиент сам меняет статус своего заказа по нажатию на кнопку оформить заказ.
                        </Text>

                        <Button type="submit" fullWidth loading={isCreating || isUpdating}>
                            {mode === 'add' ? "Создать" : "Обновить"}
                        </Button>
                    </form>
                </Box>
            </FormProvider>
        </>
    )
}

export default FastCreateWarehouse;