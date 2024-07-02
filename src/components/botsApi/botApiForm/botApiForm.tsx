import {useSelector} from "react-redux";
import {getBotApiSliceState} from "@/store/slices/botsApiSlice";
import {Controller, FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import {useActions} from "@/hooks/useActions";
import {useEffect} from "react";
import {Box, Button, Drawer, Flex, MultiSelect, TextInput} from "@mantine/core";
import classes from "@/components/stock/styles.module.css";

const BotApiForm = ({isOpen, onEditApiBot, onAddApiBot, onDelete, onClose, warehouses}: BotApiFormTypes) => {
    const {editValues} = useSelector(getBotApiSliceState);
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useFormContext();

    const {resetBotApiFormValues} = useActions();

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        const ApiBotData: IBotType = {
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

    const handleDelete = () => {
        if(editValues){
            onDelete(editValues.id)
            handleClose()
        }
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
        <Drawer.Root opened={isOpen}
                     onClose={handleClose}
                     position="right"
        >
            <Drawer.Overlay/>
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>{editValues ? 'Редактировать API' : 'Добавить API'}</Drawer.Title>
                    <Drawer.CloseButton className={classes.drawerCloseButton}/>
                </Drawer.Header>
                <Drawer.Body className={classes.drawerBody}>
                    <Box pos="relative">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <Flex direction="column" style={{height: 'calc(100vh - 65px)'}}>
                                <Box style={{flex: 1}} className={`${classes.bodyBlock}`}>
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
                                        name="token"
                                        control={control}
                                        rules={{
                                            required: "Token бота обязательно",
                                        }}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput
                                                label="API"
                                                placeholder="Введите API"
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
                                        name="warehouses"
                                        control={control}
                                        render={({field}) => (
                                            <MultiSelect
                                                label="Склады"
                                                placeholder="Выберите склад"
                                                data={warehouses.map(warehouse => ({
                                                    value: String(warehouse.id),
                                                    label: warehouse.address
                                                }))}
                                                {...field}
                                                searchable
                                                checkIconPosition="right"
                                                clearable
                                                mb={25}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="username_support"
                                        control={control}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput
                                                label="Поддержка"
                                                placeholder="Укажите контакты поддержки"
                                                onBlur={onBlur}
                                                onChange={(event) => {
                                                    onChange(event.currentTarget.value);
                                                }}
                                                value={value}
                                                error={errors?.username_support?.message ? String(errors?.username_support?.message) : undefined}
                                            />
                                        )}
                                    />
                                </Box>
                                {editValues && (
                                    <Box className={`${classes.bodyBlock}`}>
                                        <Button variant="filled" color="red" fullWidth
                                                onClick={handleDelete}>Удалить</Button>
                                    </Box>
                                )}

                                <Box>
                                    <Flex gap={16} className={`${classes.bodyBlock}`}>
                                        <Button variant="outline" fullWidth
                                                onClick={handleClose}>Отменить</Button>
                                        <Button type="submit"
                                                fullWidth>{editValues ? 'Обновить бот' : 'Добавить бот'}</Button>
                                    </Flex>
                                </Box>
                            </Flex>
                        </form>
                    </Box>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}

export default BotApiForm;