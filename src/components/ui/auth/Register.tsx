import {Box, Button, Flex, Input, Text, TextInput} from "@mantine/core";
import React, {useState} from "react";
import Stepper from "@/components/ui/Stepper/Stepper";
import {Controller, useForm} from "react-hook-form";
import {http} from "@/config/http";
import {CHECK_EMAIL_URL, REGISTRATION_URL} from "@/config/apiRoutes";
import EmailAutocomplete from "@/components/ui/form/emailAutoComplete";
import {IMaskInput} from "react-imask";
import TypeUserBtn from "@/components/ui/form/typeUserBtn";
import {IconInfoCircle} from "@tabler/icons-react";
import _ from "lodash";
import {signIn} from "next-auth/react";
import {ErrorNotifications} from "@/helpers/Notifications";
import {CompanyField, EmailField, Index, Index} from "@/components/inputs";
import {httpDaData} from "@/config/httpDaData";

interface CompanyProps {
    unrestricted_value: string;
    value: string;
    data: any;
}

const Register = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const steps = ["Расскажите о себе", "Расскажите о компании", "Проверьте информацию", "Тип личного кабинета"];
    const totalSteps = steps.length;


    const {
        handleSubmit,
        formState: {errors},
        setError,
        setValue,
        control,
        clearErrors,
        trigger,
        getValues
    } = useForm({
        defaultValues: {
            name: '',
            fio: [],
            position: '',
            email: '',
            phone: '',
            inn: '',
            company: [],
            short_with_opf: '',
            id_md: '',
            licenses: '',
            city: '',
            role: 'supplier'
        }
    });

    const onSubmit = (data) => {
        setLoading(true)
        http.post(REGISTRATION_URL, data)
            .then(function (response) {
                signIn('credentials',{redirect: true, ...response.data, callbackUrl: process.env.NEXT_PUBLIC_URL + '/login/check' });
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false);
                ErrorNotifications(error.response)
            });
    };

    const onNextStep = async () => {

        let isValid = false;

        switch (currentStep) {
            case 0:
                isValid = await trigger(["name"]);

                if (!isValid) break

                const name = getValues("name")

                if(name != ''){

                    const {data: { suggestions }} = await  httpDaData.post('suggest/fio', {
                        query: name.trim()
                    })

                    if (suggestions.length === 0) {
                        isValid = false;
                        setError('name', { type: 'custom', message: 'Что то пошло не так, напишите Имя и Фамилию правильно' });
                        break;
                    }

                    const filteredSuggestions = _.filter(suggestions, { 'value': name.trim() });
                    const {data} = _.head(filteredSuggestions)

                    if(_.isNull(data.name) || _.isNull(data.surname)){
                        isValid = false;
                        setError('name', { type: 'custom', message: 'Что то пошло не так, напишите Имя и Фамилию правильно' });
                        break;
                    }

                    setValue('fio', data);
                }

                isValid = await trigger(["position", "email", "phone"]);
                break;
            case 1:
                isValid = await trigger(["inn"]);
                const inn = getValues("inn");

                if(inn.length !== 10){
                    isValid = false;
                    setError('inn', { type: 'custom', message: 'В поле должно быть 10 цифр инн, введите до конца или выберите в списке.' });
                    break;
                }

                const {data: { suggestions }} = await httpDaData.post('suggest/party', {
                    query: inn,
                    "status": ["ACTIVE"]
                })

                if (suggestions.length === 0) {
                    isValid = false;
                    setError('inn', { type: 'custom', message: 'Введите действующий ИНН, или выберите в выподающем списке' });
                    break;
                }

                const {data} : CompanyProps = _.head(suggestions) as CompanyProps;
                setValue('company', data);
                setValue('short_with_opf', data?.name.short_with_opf)

                break;
            case 2:
                isValid = await trigger(["city"]);
                break;
            case 3:
                isValid = true;
                break;
            default:
                isValid = true;
        }

        if (isValid) {
            clearErrors()
            if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Stepper active={currentStep} steps={steps}>
                    <Stepper.Step>
                        <Controller
                            name="name"
                            rules={{
                                required: "Поле обязательно для заполнения",
                                maxLength: {value: 100, message: "Максимальное кол-во символов 100"}
                            }}
                            control={control}
                            render={({field}) => (
                                <Index field={field} setField={setValue} error={errors?.name?.message} clearErrors={clearErrors} setError={setError}/>
                            )}
                        />

                        <Controller
                            name="position"
                            rules={{
                                required: "Поле обязательно для заполнения",
                                maxLength: {value: 50, message: "Максимальное кол-во символов 50"}
                            }}
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    label="Должность"
                                    placeholder="Укажите вашу должность"
                                    onBlur={onBlur}
                                    onChange={(event) => {
                                        onChange(event.currentTarget.value);
                                    }}
                                    value={value}
                                    error={errors?.position?.message}
                                />
                            )}
                        />

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
                                        const response = await http.post(CHECK_EMAIL_URL, {'email': value});

                                        if (response.status === 201) {
                                            return 'С таким email уже зарегистрирован пользователь';
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
                                <Index onChange={onChange} onBlur={onBlur} value={value} error={errors?.phone?.message} />
                            )}
                        />
                    </Stepper.Step>
                    <Stepper.Step>
                        <Controller
                            name="inn"
                            control={control}
                            rules={{
                                required: "Поле обязательно для заполнения",
                            }}
                            render={({field}) => (
                                <CompanyField field={field} setField={setValue} error={errors?.inn?.message}/>
                            )}
                        />

                        <Flex gap={8}>
                            <Box>
                                <IconInfoCircle color="#2997A3"/>
                            </Box>
                            <Box>
                                <Text>Введите ИНН, мы автоматически определим реквизиты компании</Text>
                            </Box>
                        </Flex>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Controller
                            name="short_with_opf"
                            control={control}
                            render={({field}) => (
                                <TextInput
                                    label="Краткое наименование компании"
                                    disabled
                                    value={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.currentTarget.value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="city"
                            control={control}
                            rules={{
                                required: "Поле обязательно для заполнения",
                            }}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    value={value}
                                    onBlur={onBlur}
                                    label="Город"
                                    placeholder="Введите город"
                                    onChange={(event) => {
                                        onChange(event.currentTarget.value);
                                    }}
                                    error={errors?.city?.message}
                                />
                            )}
                        />
                    </Stepper.Step>
                    <Stepper.Step>
                        <TypeUserBtn setField={setValue}/>
                    </Stepper.Step>
                </Stepper>
                <Flex gap={10} mt={15} mb={15}>
                    {currentStep !== 0 && <Button type="button" fullWidth disabled={currentStep === 0}
                                                  onClick={previousStep}>Назад</Button>}
                    {totalSteps - 1 > currentStep &&
                        <Button type="button" fullWidth onClick={onNextStep}>Далее</Button>}
                    {totalSteps - 1 === currentStep && <Button type="submit" fullWidth>Зарегистрироваться</Button>}
                </Flex>
            </form>
        </>
    )
}

export default Register;