import {useSelector} from "react-redux";
import {getClientsState} from "@/store/slices/clientSlice";
import {useGetUserFormQuery, useUpdateUserMutation} from "@/store/api/admin/users.api";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Drawer, Flex, TextInput} from "@mantine/core";
import {useActions} from "@/hooks/useActions";
import {httpDaData} from "@/config/httpDaData";
import _ from "lodash";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {EmailField, NameField, PhoneField} from "@/components/inputs";
import {http} from "@/config/http";
import {CHECK_EMAIL_URL} from "@/config/apiRoutes";
import React, {useEffect} from "react";

const UpdateClient = ({opened = false, close}: UpdateClientTypes) => {
    const {client_id} = useSelector(getClientsState);
    const {setClientIdUpdate} = useActions();

    const [updateUser] = useUpdateUserMutation()

    const {data: client, refetch} = useGetUserFormQuery(client_id, {
        skip: client_id === 0,
    });

    const {
        handleSubmit,
        formState: {errors},
        setError,
        setValue,
        control,
        clearErrors,
        getValues,
        reset
    } = useForm<IForm>({
        defaultValues: {
            id: 0,
            name: '',
            fio: [],
            email: '',
            phone: '',
            city: '',
            position: '',
            company_name: ''
        }
    })

    useEffect(() => {
        if(client_id !== 0) {
            refetch()
        }
    }, [client_id]);

    useEffect(() => {
        if(client) {
            setValue('id', client.id);
            setValue('name', client.full_name);
            setValue('email', client.email);

            const strippedNumber = _.replace(client.phone, /^\+7/, '');
            const chunks = _.chunk(strippedNumber, 3);
            const formattedNumber = `(${chunks[0].join('')}) ${chunks[1].join('')}-${chunks[2].join('')}-${chunks[3].join('')}`;

            setValue('phone', formattedNumber);
            setValue('city', client.city);
            setValue('position', client.position);
            setValue('company_name', client.company_name);
        }
    }, [client]);

    const onSubmit = async (data: IForm) => {

        updateUser(data).unwrap().then((payload) => {
            setClientIdUpdate(0)
            reset();
            close();
            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error))
    }

    const validateFormFields = async () => {
        const name = getValues("name");

        const {data: {suggestions}} = await httpDaData.post('suggest/fio', {
            query: name.trim()
        });

        if (suggestions.length === 0) {
            return setError('name', {
                type: 'custom',
                message: 'Что то пошло не так, напишите Имя и Фамилию правильно'
            });
        }

        const filteredSuggestions = _.filter(suggestions, {'value': name.trim()});
        const {data} = _.head(filteredSuggestions)

        if (_.isNull(data.name) || _.isNull(data.surname)) {
            return setError('name', {
                type: 'custom',
                message: 'Что то пошло не так, напишите Имя и Фамилию правильно'
            });
        }

        setValue('fio', data);

        await onSubmit(getValues())
    }

    return (
        <Drawer
            opened={opened}
            onClose={() => {
                setClientIdUpdate(0)
                reset();
                close();
            }}
            position="right"
            title="Редактировать клиента">
            <form onSubmit={handleSubmit(validateFormFields)}>
                <Flex direction="column" justify="space-between" gap={15} h="calc(100vh - 80px)">
                    <Box>
                        <Controller
                            name="name"
                            rules={{
                                required: "Поле обязательно для заполнения",
                                maxLength: {value: 100, message: "Максимальное кол-во символов 100"}
                            }}
                            control={control}
                            render={({field}) => (
                                <NameField field={field} setField={setValue} error={errors?.name?.message}
                                           clearErrors={clearErrors} setError={setError}/>
                            )}/>

                        <Controller
                            name="email"
                            rules={{
                                required: "Поле обязательно для заполнения",
                                maxLength: {value: 150, message: "Максимальное кол-во символов 150"},
                                pattern: {
                                    value: /^(?!.*--)[A-Za-zА-Яа-я0-9._%+-]+@[A-Za-zА-Яа-я0-9-]+(\.[A-Za-zА-Яа-я0-9]+)*\.[A-Za-zА-Яа-я]{2,}$/,
                                    message: "Введите email в правильном формате",
                                },
                                validate: async (value) => {
                                    try {
                                        if (client?.email !== value) {
                                            const response = await http.post(CHECK_EMAIL_URL, {'email': value});

                                            if (response.status === 201) {
                                                return 'С таким email уже зарегистрирован пользователь';
                                            }
                                        }
                                    } catch (error) {
                                        return true;
                                    }

                                    return true;
                                },
                            }}
                            control={control}
                            render={({field}) => (
                                <EmailField field={field} errors={errors}/>
                            )}/>

                        <Controller
                            name="company_name"
                            rules={{
                                required: "Поле обязательно для заполнения"
                            }}
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput label="Компания"
                                           onBlur={onBlur}
                                           onChange={(event) => {
                                               onChange(event.currentTarget.value);
                                           }}
                                           value={value}
                                           disabled />
                            )}
                        />

                        <Controller
                            name="city"
                            rules={{
                                required: "Поле обязательно для заполнения"
                            }}
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput label="Город"
                                           onBlur={onBlur}
                                           onChange={(event) => {
                                               onChange(event.currentTarget.value);
                                           }}
                                           value={value}
                                           error={errors?.city?.message}/>
                            )}
                        />

                        <Controller
                            name="position"
                            rules={{
                                required: "Поле обязательно для заполнения"
                            }}
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput label="Должность"
                                           onBlur={onBlur}
                                           onChange={(event) => {
                                               onChange(event.currentTarget.value);
                                           }}
                                           value={value}
                                           error={errors?.position?.message}/>
                            )}
                        />

                        <Controller
                            name="phone"
                            rules={{
                                required: "Поле обязательно для заполнения",
                                minLength: {value: 15, message: "Введите корректный номер телефона"}
                            }}
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <PhoneField onChange={onChange} onBlur={onBlur} value={value}
                                            error={errors?.phone?.message}/>
                            )}
                        />
                    </Box>

                    <Button type="submit">Обновить</Button>
                </Flex>
            </form>
        </Drawer>
    )
}

export default UpdateClient;