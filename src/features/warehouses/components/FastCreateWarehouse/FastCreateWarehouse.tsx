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
import {useTranslation} from "@/hooks/useTranslation";

interface FastCreateWarehouseProps {
    onClose: () => void;
    mode: 'add' | 'edit';
    initialData?: any;
}

const FastCreateWarehouse = ({ onClose, mode, initialData }: FastCreateWarehouseProps) => {

    const { trans } = useTranslation();

    const {
        methods,
        onSubmit,
        isCreating,
        isUpdating,
        regionsData,
        filteredCities,
        selectedRegionId,
        currenciesData
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
                            {mode === 'add' ? trans('warehouses', 'form.title.add') : trans('warehouses', 'form.title.edit')}
                        </Text>
                        <ActionIcon onClick={onClose}>
                            <IconX size={16} />
                        </ActionIcon>
                    </Flex>
                    <form onSubmit={onSubmit}>
                        <Controller
                            name="name"
                            control={methods.control}
                            rules={{
                                required: "Это поле обязательно.",
                            }}
                            render={({field: {value, onChange}, fieldState: {error}}) => {
                                return (
                                    <TextInput
                                        value={value}
                                        onChange={onChange}
                                        label={trans('warehouses', 'form.inputs.name')}
                                        placeholder={trans('warehouses', 'form.placeholders.name')}
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
                                        mb={15}
                                    />
                                )
                            }}
                        />

                        <Fieldset legend={trans('warehouses', 'form.fieldset.address')} variant="unstyled">
                            <Controller
                                name="region_id"
                                control={control}
                                rules={{required: "Выбор региона обязателен."}}
                                render={({field: {value, onChange}, fieldState: {error}}) => (
                                    <Select
                                        label={trans('warehouses', 'form.inputs.region')}
                                        placeholder={trans('warehouses', 'form.placeholders.region')}
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
                                        label={trans('warehouses', 'form.inputs.city')}
                                        placeholder={trans('warehouses', 'form.placeholders.city')}
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
                                            label={trans('warehouses', 'form.inputs.address')}
                                            placeholder={trans('warehouses', 'form.placeholders.address')}
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
                        <Fieldset legend={trans('warehouses', 'form.fieldset.delivery')} variant="unstyled" mt={15} mb={15}>
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
                                        label={trans('warehouses', 'form.inputs.delivery_day')}
                                        placeholder={trans('warehouses', 'form.placeholders.delivery_day')}
                                        value={value}
                                        onChange={(val) => onChange(val)}
                                        min={1}
                                        error={error?.message}
                                        // Optional: You can adjust the step and precision as needed
                                        step={1}
                                        precision={0}
                                    />
                                )}
                            />
                        </Fieldset>
                        <Fieldset legend={trans('warehouses', 'form.fieldset.payment')} variant="unstyled">
                            <Controller
                                name="currency_id"
                                control={control}
                                rules={{required: "Поле обязательно"}}
                                render={({field: {value, onChange}, fieldState: {error}}) => (
                                    <Select
                                        label={trans('warehouses', 'form.inputs.currency_id')}
                                        placeholder={trans('warehouses', 'form.placeholders.currency_id')}
                                        data={currenciesData}
                                        value={value}
                                        onChange={onChange}
                                        clearable
                                        error={error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="type_orders"
                                control={control}
                                render={({field}) => (
                                    <Radio.Group {...field} name="type_orders">
                                        <Group mt="xs">
                                            <Radio value="cart" label={trans('warehouses', 'form.type_orders.cart')}/>
                                            <Radio value="control_point" label={trans('warehouses', 'form.type_orders.control_point')} disabled/>
                                        </Group>
                                    </Radio.Group>
                                )}
                            />
                        </Fieldset>

                        <Text>
                            {trans('warehouses', 'form.type_orders.cart_text')}
                        </Text>

                        <Button type="submit" fullWidth loading={isCreating || isUpdating}>
                            {mode === 'add' ? trans('buttons', 'create') : trans('buttons', 'update')}
                        </Button>
                    </form>
                </Box>
            </FormProvider>
        </>
    )
}

export default FastCreateWarehouse;