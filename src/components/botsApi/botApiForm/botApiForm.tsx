import {Controller, FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import {Box, Button, Drawer, Flex, MultiSelect, TextInput} from "@mantine/core";
import classes from "@/components/stock/styles.module.css";

const BotApiForm = ({isOpen, onEditApiBot, onAddApiBot, onDelete, onClose, warehouses}: BotApiFormTypes) => {
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useFormContext();

    const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
        const ApiBotData: IBotType = {
            id: data.id,
            name: data.name,
            token: data.token,
            username_support: data.username_support,
            username_bot: data.username_bot,
            warehouses: data.warehouses
        }

        // if (editValues) {
        //     onEditApiBot(ApiBotData)
        // } else {
        //     onAddApiBot(ApiBotData)
        // }
    }

    const handleClose = () => {

        reset();
        onClose();
    }

    const handleDelete = () => {
        // if(editValues){
        //     onDelete(editValues.id)
        //     handleClose()
        // }
    }

    // useEffect(() => {
    //     if (editValues) {
    //         setValue('id', editValues.id)
    //         setValue('name', editValues.name)
    //         setValue('token', editValues.token)
    //         setValue('username_bot', editValues.username_bot)
    //         setValue('username_support', editValues.username_support)
    //         setValue('warehouses', (editValues.warehouses ?? []).map(warehouse => String(warehouse.value)));
    //     }
    // }, [editValues]);

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
                    {/*<Drawer.Title>{editValues ? 'Редактировать API' : 'Добавить API'}</Drawer.Title>*/}
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
                                            minLength: { value: 5, message: "Минимальное количество символов - 5" },
                                            maxLength: { value: 100, message: "Максимальное количество символов - 100" }
                                        }}
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <TextInput
                                                label="Название"
                                                placeholder="Введите название"
                                                onBlur={onBlur}
                                                onChange={(event) => {
                                                    const sanitizedValue = sanitizeAddressInput(event.currentTarget.value);
                                                    onChange(sanitizedValue);
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
                                            minLength: { value: 5, message: "Минимальное количество символов - 5" },
                                            maxLength: { value: 100, message: "Максимальное количество символов - 100" },
                                            validate: {
                                                noSpaces: value => !/\s/.test(value) || "Ввод пробелов запрещен",
                                            }
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
                                        rules={{
                                            minLength: { value: 5, message: "Минимальное количество символов - 5" },
                                            maxLength: { value: 100, message: "Максимальное количество символов - 100" },
                                            pattern: {
                                                value: /^[a-zA-Z0-9._]+$/,
                                                message: "Только латинские буквы, цифры и символы ._"
                                            }
                                        }}
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
                                {/*{editValues && (*/}
                                {/*    <Box className={`${classes.bodyBlock}`}>*/}
                                {/*        <Button variant="filled" color="red" fullWidth*/}
                                {/*                onClick={handleDelete}>Удалить</Button>*/}
                                {/*    </Box>*/}
                                {/*)}*/}

                                <Box>
                                    <Flex gap={16} className={`${classes.bodyBlock}`}>
                                        <Button variant="outline" fullWidth
                                                onClick={handleClose}>Отменить</Button>
                                        <Button type="submit"
                                                fullWidth>Добавить бот</Button>
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