'use client'

import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Button, Divider, Modal, Text, Image, Flex, Box, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {IconChevronLeft, IconX} from "@tabler/icons-react";

import classes from "@/features/auth/components/ModalAuth/ModalAuth.module.css";
import Link from "next/link";
import {Controller, FormProvider, useForm} from "react-hook-form";
import EmailAutocomplete from "@/components/Inputs/EmailAutocomplete";
import PinCodeInput from "@/components/Inputs/PinCodeInput";
import PhoneInput from "@/components/Inputs/PhoneInput";
import CompanyInput from "@/components/Inputs/CompanyInput";
import {useAuth} from "@/features/auth/hooks/useAuth";
import {capitalizeWords} from "@/utils/utils";
import {useTranslation} from "@/hooks/useTranslation";
import {useLanguage} from "@/providers/LanguageProvider";
import {notify} from "@/utils/notify";

interface FormValues {
    email: string;
    pin: string;
    name: string;
    phone: string;
    company: string;
    lang: string;
}

const ModalAuth = () => {
    const { language } = useLanguage();
    const [opened, {open, close}] = useDisclosure(false);
    const [step, setStep] = useState(1);
    const { sendCode, checkCode, login, register, isLoading, error } = useAuth();

    const { trans } = useTranslation();

    // Массив объектов для каждого шага с заголовком и подзаголовком
    const steps = [
        {
            title: trans('auth', 'steps.one.title'),
            subtitle: trans('auth', 'steps.one.subtitle'),
        },
        {
            title: trans('auth', 'steps.two.title'),
            subtitle: trans('auth', 'steps.two.subtitle'),
        },
        {
            title: trans('auth', 'steps.three.title'),
            subtitle: trans('auth', 'steps.three.subtitle'),
        },
    ];

    const handleBack = () => {
        if (step > 1) setStep(1);
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            email: '',
            pin: '',
            name: '',
            phone: '',
            company: '',
            lang: ''
        },
    });

    const {handleSubmit} = methods;

    useEffect(() => {
        if (language) {
            methods.setValue('lang', language);
        }
    }, [language, methods]);

    const onSubmit = async (data: FormValues) => {
        if (step === 1) {
            // Step 1: Отправка кода на почту
            try {
                await sendCode({ email: data.email, lang: data.lang });
                setStep(2);
            } catch (err: any) {
                notify(err.response?.data?.message, 'error');
            }
        } else if (step === 2) {
            // Step 2: Проверка кода и авторизация
            try {
                const isRegistered = await checkCode({ email: data.email, code: data.pin });
                if (isRegistered) {
                    // Пользователь зарегистрирован, выполняем вход
                    await login({ email: data.email });
                    close(); // Закрываем модальное окно после успешного входа
                } else {
                    // Пользователь не зарегистрирован, переходим к регистрации
                    setStep(3);
                }
            } catch (err: any) {
                methods.setError('pin', {
                    type: 'manual',
                    message: error || 'Неверный код',
                });
            }
        } else if (step === 3) {
            // Step 3: Регистрация пользователя
            try {
                const userData = {
                    email: data.email,
                    pin: data.pin, // Предполагаем, что PIN нужен при регистрации
                    name: data.name,
                    phone: data.phone,
                    company: data.company,
                    lang: data.lang,
                };
                await register(userData);
                close(); // Закрываем модальное окно после успешной регистрации и входа
            } catch (err: any) {
                // Можно установить ошибку на конкретное поле, если нужно
                methods.setError('company', {
                    type: 'manual',
                    message: error || 'Ошибка при регистрации',
                });
            }
        }
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}>
                <Flex justify="space-between" align="flex-start" wrap="nowrap" mb={30}>
                    <ActionIcon
                        variant="light"
                        color="#1B1F3BA6"
                        onClick={handleBack}>
                        <IconChevronLeft style={{width: '80%', height: '80%'}} stroke={2}/>
                    </ActionIcon>
                    <Box>
                        <Text className={classes.titleModal}>{steps[step - 1].title}</Text>
                        <Text className={classes.subtitleModal}>{steps[step - 1].subtitle}</Text>
                    </Box>
                    <ActionIcon
                        variant="light"
                        color="#1B1F3BA6"
                        onClick={close}>
                        <IconX style={{width: '80%', height: '80%'}} stroke={2}/>
                    </ActionIcon>
                </Flex>


                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {step === 1 && (
                            <EmailAutocomplete
                                label={trans('auth', 'inputs.email')}
                                placeholder={trans('auth', 'placeholders.email')}
                            />
                        )}

                        {step === 2 && (
                            <PinCodeInput />
                        )}

                        {step === 3 && (
                            <>
                            {/*<FioAutocomplete label="ФИО" placeholder="Введите ФИО"/>*/}
                                <Controller
                                    name="name"
                                    control={methods.control}
                                    rules={{required: trans('auth', 'rules.required')}}
                                    render={({field, fieldState}) => (
                                        <TextInput
                                            label={trans('auth', 'inputs.name')}
                                            placeholder={trans('auth', 'placeholders.name')}
                                            value={field.value}
                                            onChange={(value) => {
                                                field.onChange(capitalizeWords(value.currentTarget.value));
                                            }}
                                            error={fieldState.error?.message}
                                        />
                                    )}
                                />
                            <PhoneInput/>
                            <CompanyInput/>
                            </>
                        )}

                        <Button fullWidth loading={isLoading} type="submit" mt={16}>
                            {step < 3 ? trans('buttons', 'next') : trans('buttons', 'register')}
                        </Button>
                    </form>
                </FormProvider>

                <Divider label={trans('global', 'or')} labelPosition="center" mt={25} mb={25}/>

                <Button variant="outline" fullWidth={true} mb={25} disabled>
                    <Image src="/icons/yandex.svg" width="16" height="16" mr={8}/>
                    {trans('auth', 'buttons.yandex')} {trans('global', 'soon')}
                </Button>

                <Text className={classes.textConditions}>
                    {trans('auth', 'conditions.text')} <Text component={Link} href="#">{trans('auth', 'conditions.processing')}</Text> {trans('global', 'and')} <Text component={Link} href="#">{trans('auth', 'conditions.privacy')}</Text>
                </Text>
            </Modal>

            <Button onClick={open}>{trans('buttons', 'login')}</Button>
        </>
    );
}

export default ModalAuth;