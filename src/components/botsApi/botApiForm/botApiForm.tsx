import {useSelector} from "react-redux";
import {getBotApiSliceState} from "@/store/slices/botsApiSlice";
import {Controller, FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import {useActions} from "@/hooks/useActions";
import {useEffect} from "react";
import {Box, Button, Drawer, MultiSelect, TextInput} from "@mantine/core";

const BotApiForm = ({isOpen, onEditApiBot, onAddApiBot, onClose, warehouses} : BotApiFormTypes) => {
    const {editValues} = useSelector(getBotApiSliceState);
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useFormContext();

    const {resetBotApiFormValues} = useActions();

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        const ApiBotData : IBotType = {
            id: data.id,
            name: data.name,
            token: data.token,
            username_support: data.username_support,
            username_bot: data.username_bot,
            warehouses: data.warehouses
        }

        if (editValues) {
            onEditApiBot(ApiBotData)
        } else {
            onAddApiBot(ApiBotData)
        }
    }

    const handleClose = () => {
        resetBotApiFormValues('');
        reset();
        onClose();
    }

    useEffect(() => {
        if (editValues) {
            setValue('id', editValues.id)
            setValue('name', editValues.name)
            setValue('token', editValues.token)
            setValue('username_bot', editValues.username_bot)
            setValue('username_support', editValues.username_support)
            setValue('warehouses', (editValues.warehouses ?? []).map(warehouse => String(warehouse.value)));
        }
    }, [editValues]);

    return (
        <Drawer opened={isOpen}
                onClose={handleClose}
                position="right"
                title={editValues ? 'Редактировать бот' : 'Добавить бот'}
        >
            <Box pos="relative">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: "Название обязательно",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Название"
                                placeholder="Введите название"
                                description="Название используется для разделения клиентов по разным ботам"
                                onBlur={onBlur}
                                onChange={(event) => {
                                    onChange(event.currentTarget.value);
                                }}
                                value={value}
                                error={errors?.name?.message ? String(errors?.name?.message) : undefined}
                            />
                        )}
                    />
                    <Controller
                        name="username_bot"
                        control={control}
                        rules={{
                            required: "Username бота обязательно",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Username бота"
                                placeholder="Введите username бота"
                                description="Пример что должно быть заполнено: @BotFather, только именно вашего бота"
                                onBlur={onBlur}
                                onChange={(event) => {
                                    onChange(event.currentTarget.value);
                                }}
                                value={value}
                                error={errors?.username_bot?.message ? String(errors?.username_bot?.message) : undefined}
                            />
                        )}
                    />
                    <Controller
                        name="token"
                        control={control}
                        rules={{
                            required: "Token бота обязательно",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Token бота"
                                placeholder="Введите token бота"
                                description="Для получения api token бота вы должны его создать в телеграм боте @BotFather (https://t.me/BotFather)"
                                onBlur={onBlur}
                                onChange={(event) => {
                                    onChange(event.currentTarget.value);
                                }}
                                value={value}
                                error={errors?.token?.message ? String(errors?.token?.message) : undefined}
                            />
                        )}
                    />
                    <Controller
                        name="username_support"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Username администратора"
                                placeholder="Введите username администратора"
                                description="Пример что должно быть заполнено: @BotFather, только именно вас для обратной связи"
                                onBlur={onBlur}
                                onChange={(event) => {
                                    onChange(event.currentTarget.value);
                                }}
                                value={value}
                                error={errors?.username_support?.message ? String(errors?.username_support?.message) : undefined}
                            />
                        )}
                    />
                    <Controller
                        name="warehouses"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                label="Склады"
                                placeholder="Выберите склад"
                                description="Выберите склады которые относятся к боту. Если склад не выбран то в боте не будут отображаться товары со склада"
                                data={warehouses.map(warehouse => ({ value: String(warehouse.id), label: warehouse.address }))}
                                {...field}
                                searchable
                                checkIconPosition="right"
                                clearable
                                mb={25}
                            />
                        )}
                    />
                    <Button fullWidth={true} type="submit">{editValues ? 'Обновить бот' : 'Добавить бот'}</Button>
                </form>
            </Box>
        </Drawer>
    )
}

export default BotApiForm;