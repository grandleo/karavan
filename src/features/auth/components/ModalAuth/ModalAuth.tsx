import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Button, Divider, Modal, Text, Image, Flex, Box} from "@mantine/core";
import {useState} from "react";
import {IconChevronLeft, IconX} from "@tabler/icons-react";

import classes from "@/features/auth/components/ModalAuth/ModalAuth.module.css";
import Link from "next/link";
import {FormProvider, useForm} from "react-hook-form";
import EmailAutocomplete from "@/components/Inputs/EmailAutocomplete";
import PinCodeInput from "@/components/Inputs/PinCodeInput";
import FioAutocomplete from "@/components/Inputs/FioAutocomplete";
import PhoneInput from "@/components/Inputs/PhoneInput";
import CompanyInput from "@/components/Inputs/CompanyInput";
import {useAuth} from "@/features/auth/hooks/useAuth";

interface FormValues {
    email: string;
    pin: string;
    phone: string;
    company: string;
    fio: {
        query?: string;
        surname: string;
        name: string;
        patronymic: string;
    };
}

const ModalAuth = () => {
    const [opened, {open, close}] = useDisclosure(false);
    const [step, setStep] = useState(1);
    const { sendCode, checkCode, login, register, isLoading, error } = useAuth();

    // Массив объектов для каждого шага с заголовком и подзаголовком
    const steps = [
        {
            title: 'Введите почту',
            subtitle: '',
        },
        {
            title: 'Проверка почты',
            subtitle: 'Введите код из письма.',
        },
        {
            title: 'Регистрация',
            subtitle: 'Введите данные для регистрации.',
        },
    ];

    const handleBack = () => {
        if (step > 1) setStep(1);
    };

    const methods = useForm<FormValues>({
        defaultValues: {
            email: '',
            pin: '',
            phone: '',
            company: '',
            fio: {
                surname: '',
                name: '',
                patronymic: '',
                query: '',
            },
        },
    });

    const {handleSubmit} = methods;

    const onSubmit = async (data: FormValues) => {
        if (step === 1) {
            // Step 1: Отправка кода на почту
            try {
                await sendCode({ email: data.email });
                setStep(2);
            } catch (err: any) {
                console.error('Ошибка при отправке кода:', err);
                methods.setError('email', {
                    type: 'manual',
                    message: error || 'Не удалось отправить код на почту',
                });
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
                    console.log('Пользователь не зарегистрирован, переходим к шагу 3');
                    setStep(3);
                }
            } catch (err: any) {
                console.error('Ошибка при проверке кода:', err);
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
                    fio: data.fio,
                    phone: data.phone,
                    company: data.company,
                };
                await register(userData);
                close(); // Закрываем модальное окно после успешной регистрации и входа
            } catch (err: any) {
                console.error('Ошибка при регистрации:', err);
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
                        aria-label="Назад"
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
                        aria-label="Закрыть"
                        onClick={close}>
                        <IconX style={{width: '80%', height: '80%'}} stroke={2}/>
                    </ActionIcon>
                </Flex>


                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {step === 1 && (
                            <EmailAutocomplete
                                label="Почта"
                                placeholder="name@mail.ru"
                            />
                        )}

                        {step === 2 && (
                            <PinCodeInput />
                        )}

                        {step === 3 && (
                            <>
                            <FioAutocomplete label="ФИО" placeholder="Введите ФИО"/>
                            <PhoneInput/>
                            <CompanyInput/>
                            </>
                        )}

                        <Button fullWidth loading={isLoading} type="submit" mt={16}>
                            {step < 3 ? 'Далее' : 'Зарегистрироваться'}
                        </Button>
                    </form>
                </FormProvider>

                <Divider label="Или" labelPosition="center" mt={25} mb={25}/>

                <Button variant="outline" fullWidth={true} mb={25} disabled>
                    <Image src="/icons/yandex.svg" width="16" height="16" mr={8}/>
                    Яндекс (скоро)
                </Button>

                <Text className={classes.textConditions}>Создавая учетную запись, вы соглашаетесь с нашими <Text
                    component={Link} href="#">условиями обработки данных</Text> и <Text component={Link} href="#">политикой
                    конфиденциальности.</Text></Text>
            </Modal>

            <Button onClick={open}>Войти</Button>
        </>
    );
}

export default ModalAuth;