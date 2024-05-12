import {useSelector} from "react-redux";
import {getBotApiSliceState} from "@/store/slices/botsApiSlice";
import {Controller, FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import {useActions} from "@/hooks/useActions";
import {useEffect} from "react";
import {Box, Button, Drawer, TextInput} from "@mantine/core";

const BotApiForm = ({isOpen, onEditApiBot, onAddApiBot, onClose} : BotApiFormTypes) => {
    const {editValues} = useSelector(getBotApiSliceState);
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useFormContext();

    const {resetBotApiFormValues} = useActions();

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        const ApiBotData : IBotType = {
            id: data.id,
            name: data.name,
            api: data.api,
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
            setValue('api', editValues.api)
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
                            required: "Название бота обязательно",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Название бота"
                                placeholder="Введите название бота"
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
                        name="api"
                        control={control}
                        rules={{
                            required: "API бота обязательно",
                        }}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Api бота"
                                placeholder="Введите api бота"
                                onBlur={onBlur}
                                onChange={(event) => {
                                    onChange(event.currentTarget.value);
                                }}
                                value={value}
                                error={errors?.api?.message ? String(errors?.api?.message) : undefined}
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