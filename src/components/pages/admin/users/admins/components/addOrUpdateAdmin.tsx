import {useDisclosure} from "@mantine/hooks";
import {Box, Button, Drawer, Flex} from "@mantine/core";
import {EmailField, NameField, PhoneField} from "@/components/inputs";
import {Controller, useForm} from "react-hook-form";
import {http} from "@/config/http";
import {CHECK_EMAIL_URL} from "@/config/apiRoutes";
import React, {useEffect} from "react";
import {httpDaData} from "@/config/httpDaData";
import _ from "lodash";
import {useAddAdminUserMutation, useGetAdminUserQuery, useUpdateAdminUserMutation} from "@/store/api/admin/users.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useSelector} from "react-redux";
import {getAdminsState} from "@/store/slices/adminsSlice";
import {useActions} from "@/hooks/useActions";


const AddOrUpdateAdmin = ({opened = false, open, close} : AddOrUpdateAdminTypes) => {
    const {admin_id} = useSelector(getAdminsState);
    const {setAdminIdUpdate} = useActions();

    const [addAdmin] = useAddAdminUserMutation();
    const [updateAdmin] = useUpdateAdminUserMutation();

    const {data: admin, refetch} = useGetAdminUserQuery(admin_id, {
        skip: admin_id === 0,
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
        }
    })

    useEffect(() => {
        if(admin_id !== 0) {
            refetch()
        }
    }, [admin_id]);

    useEffect(() => {
        if(admin) {
            setValue('id', admin.id);
            setValue('name', admin.full_name);
            setValue('email', admin.email);

            const strippedNumber = _.replace(admin.phone, /^\+7/, '');
            const chunks = _.chunk(strippedNumber, 3);
            const formattedNumber = `(${chunks[0].join('')}) ${chunks[1].join('')}-${chunks[2].join('')}-${chunks[3].join('')}`;

            setValue('phone', formattedNumber);
        }
    }, [admin]);

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

    const onSubmit = async (data: IForm) => {
        const request = admin ? updateAdmin(data) : addAdmin(data);

        request.unwrap().then((payload) => {
            setAdminIdUpdate(0)
            reset();
            close();
            SuccessNotifications(payload)
        }).catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <Button mb={20} onClick={open}>Добавить администратора</Button>

            <Drawer
                opened={opened}
                onClose={() => {
                    setAdminIdUpdate(0)
                    reset();
                    close();
                }}
                position="right"
                title={admin ? "Редактировать администратора" : "Добавить администратора"}>
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
                                            if(admin?.email !== value) {
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

                        <Button type="submit">{admin ? "Обновить" : "Добавить"}</Button>
                    </Flex>
                </form>
            </Drawer>
        </>
    )
}

export default AddOrUpdateAdmin;