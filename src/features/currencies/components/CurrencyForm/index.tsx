import {Button, Drawer, Flex, TextInput} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {
    useCreateCurrencyMutation, useDeleteCurrencyMutation,
    useLazyFetchCurrencyQuery,
    useUpdateCurrencyMutation
} from "@/features/currencies/api/currenciesApi";
import {useEffect} from "react";
import {notify} from "@/utils/notify";

const CurrencyForm = ({opened, close, currencyId}) => {
    const [triggerFetchCurrency, { data: currency, error, isLoading }] = useLazyFetchCurrencyQuery();
    const [createCurrency] = useCreateCurrencyMutation();
    const [updateCurrency] = useUpdateCurrencyMutation();
    const [deleteCurrency] = useDeleteCurrencyMutation();

    const methods = useForm({
        defaultValues: {
            name: {
                ru: '',
                en: '',
            },
            prefix: '',
            suffix: '',
        }
    });

    useEffect(() => {
        if (opened && currencyId) {
            triggerFetchCurrency(currencyId);
        }
    }, [opened, currencyId, triggerFetchCurrency]);

    useEffect(() => {
        if (currency) {
            const sanitizedCurrency = {
                name: {
                    ru: currency.name?.ru || '',
                    en: currency.name?.en || '',
                },
                prefix: currency.prefix || '',
                suffix: currency.suffix || '',
            };
            methods.reset(sanitizedCurrency);
        }
    }, [currency]);

    const handleClose = () => {
        methods.reset({
            name: { ru: '', en: '' },
            prefix: '',
            suffix: '',
        }); // Явный сброс данных формы до пустых значений
        close();
    }

    const handleDelete = async () => {
        try {
            const response = await deleteCurrency(currencyId).unwrap();
            notify(response.message, "success"); // Передаем ответ сервера в notify
            handleClose();
        } catch (error) {
            notify(error?.data?.message, 'error');
        }
        // if (currencyId) {
        //     const response = await deleteCurrency(currencyId).unwrap();
        //     handleClose(); // Закрытие формы после удаления
        //     notify('message', 'success')
        // }
    };

    // const onSubmit = async (data) => {
    //     if (currencyId) {
    //         await updateCurrency({ id: currencyId, ...data }).unwrap();
    //     } else {
    //         await createCurrency(data).unwrap();
    //     }
    //     handleClose();
    // }

    const onSubmit = async (data) => {
        try {
            let response;
            if (currencyId) {
                response = await updateCurrency({ id: currencyId, ...data }).unwrap();
                notify(response.message || "Валюта успешно обновлена", "success"); // Извлекаем message из ответа
            } else {
                response = await createCurrency(data).unwrap();
                notify(response.message || "Валюта успешно добавлена", "success"); // Извлекаем message из ответа
            }
            handleClose();
        } catch (err) {
            notify(err.message || "Ошибка при сохранении валюты", "error");
        }
    };


    return (
        <Drawer opened={opened} onClose={handleClose} title={currencyId ? "Редактировать валюту" : "Добавить валюту"}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Controller
                    name="name.ru"
                    control={methods.control}
                    render={({field}) => (
                        <TextInput
                            label="Название валюты на русском"
                            placeholder="Название валюты на русском"
                            mb={8}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="name.en"
                    control={methods.control}
                    render={({field}) => (
                        <TextInput
                            label="Название валюты на английском"
                            placeholder="Название валюты на английском"
                            mb={8}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="prefix"
                    control={methods.control}
                    render={({field}) => (
                        <TextInput
                            label="Знак валюты до суммы"
                            placeholder="Знак валюты до суммы"
                            mb={8}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="suffix"
                    control={methods.control}
                    render={({field}) => (
                        <TextInput
                            label="Знак валюты после суммы"
                            placeholder="Знак валюты после суммы"
                            mb={8}
                            {...field}
                        />
                    )}
                />
                {currencyId && (
                    <Button fullWidth color="#DD4C1E" mb={16} onClick={handleDelete}>Удалить</Button>
                )}
                <Flex gap={16}>
                    <Button variant="outline" fullWidth onClick={handleClose}>Отменить</Button>
                    <Button type="submit" variant="filled" fullWidth >{currencyId ? "Обновить" : "Добавить"}</Button>
                </Flex>
            </form>
        </Drawer>
    )
}

export default CurrencyForm;