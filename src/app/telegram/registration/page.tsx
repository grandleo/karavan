"use client";

import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
    Container,
    Title,
    Flex,
    Box,
    ActionIcon,
    Text,
    TextInput,
    Button,
    Divider,
    Image
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";

import classes from "@/features/auth/components/ModalAuth/ModalAuth.module.css";
import Link from "next/link";

import EmailAutocomplete from "@/components/Inputs/EmailAutocomplete";
import PinCodeInput from "@/components/Inputs/PinCodeInput";
import PhoneInput from "@/components/Inputs/PhoneInput";
import CompanyInput from "@/components/Inputs/CompanyInput";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/providers/LanguageProvider";
import { notify } from "@/utils/notify";
import { capitalizeWords } from "@/utils/utils";
import {useTgAuth} from "@/features/auth/hooks/useTgAuth";

interface FormValues {
    email: string;
    pin: string;
    name: string;
    phone: string;
    company: string;
    lang: string;
}

export default function RegistrationPage() {
    const { language } = useLanguage();
    const { trans } = useTranslation();

    const [step, setStep] = useState(1);

    // Логика авторизации/регистрации, как в ModalAuth
    const { sendCode, checkCode, login, register, isLoading, error } = useTgAuth();

    // Массив с заголовками и подзаголовками для каждого шага
    const steps = [
        {
            title: trans("auth", "steps.one.title"),
            subtitle: trans("auth", "steps.one.subtitle"),
        },
        {
            title: trans("auth", "steps.two.title"),
            subtitle: trans("auth", "steps.two.subtitle"),
        },
        {
            title: trans("auth", "steps.three.title"),
            subtitle: trans("auth", "steps.three.subtitle"),
        },
    ];

    const methods = useForm<FormValues>({
        defaultValues: {
            email: "",
            pin: "",
            name: "",
            phone: "",
            company: "",
            lang: "",
        },
    });

    const { handleSubmit } = methods;

    // Автоматически прописываем текущий язык в поле lang
    useEffect(() => {
        if (language) {
            methods.setValue("lang", language);
        }
    }, [language, methods]);

    // Обработка нажатия «Назад»
    const handleBack = () => {
        if (step === 2) setStep(1);
        if (step === 3) setStep(2);
    };

    // Основной метод отправки формы
    const onSubmit = async (data: FormValues) => {
        if (step === 1) {
            // 1. Отправка кода на почту
            try {
                await sendCode({ email: data.email, lang: data.lang });
                setStep(2);
            } catch (err: any) {
                notify(err.response?.data?.message, "error");
            }
        } else if (step === 2) {
            // 2. Проверка кода
            try {
                // Если код корректен, просто идём на 3-й шаг
                await checkCode({ email: data.email, code: data.pin });
                setStep(3);
            } catch (err: any) {
                methods.setError("pin", {
                    type: "manual",
                    message: error || "Неверный код",
                });
            }
        } else if (step === 3) {
            // 3. Регистрация пользователя
            try {
                const userData = {
                    email: data.email,
                    pin: data.pin,
                    name: data.name,
                    phone: data.phone,
                    company: data.company,
                    lang: data.lang,
                };
                await register(userData);
                await login(userData);
                // После удачной регистрации — логин, редирект или уведомление
            } catch (err: any) {
                methods.setError("company", {
                    type: "manual",
                    message: error || "Ошибка при регистрации",
                });
            }
        }
    };

    return (
        <Container size="xs">
            {/* Заголовок страницы */}
            <Title order={3} style={{ marginBottom: "20px", fontWeight: "600" }}>
                {trans("buttons", "register")} {/* или просто "Регистрация" */}
            </Title>

            {/* Шаги регистрации/авторизации прямо на странице */}
            <Flex
                direction="column"
                sx={{
                    padding: "1rem",
                    border: "1px solid #eaeaea",
                    borderRadius: 8,
                }}
            >
                {/* Навигация: «Назад» и Заголовок/подзаголовок шага */}
                <Flex justify="space-between" align="flex-start" mb={30}>
                    {step > 1 ? (
                        <ActionIcon variant="light" onClick={handleBack}>
                            <IconChevronLeft stroke={2} />
                        </ActionIcon>
                    ) : (
                        <Box style={{ width: 40 }} />
                    )}

                    <Box sx={{ textAlign: "center", flexGrow: 1 }}>
                        <Text className={classes.titleModal}>{steps[step - 1].title}</Text>
                        <Text className={classes.subtitleModal}>{steps[step - 1].subtitle}</Text>
                    </Box>

                    <Box style={{ width: 40 }} />
                </Flex>

                {/* Форма */}
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {step === 1 && (
                            <EmailAutocomplete
                                label={trans("auth", "inputs.email")}
                                placeholder={trans("auth", "placeholders.email")}
                            />
                        )}

                        {step === 2 && <PinCodeInput />}

                        {step === 3 && (
                            <>
                                <Controller
                                    name="name"
                                    control={methods.control}
                                    rules={{ required: trans("auth", "rules.required") }}
                                    render={({ field, fieldState }) => (
                                        <TextInput
                                            label={trans("auth", "inputs.name")}
                                            placeholder={trans("auth", "placeholders.name")}
                                            value={field.value}
                                            onChange={(value) => {
                                                field.onChange(capitalizeWords(value.currentTarget.value));
                                            }}
                                            error={fieldState.error?.message}
                                            mt="md"
                                        />
                                    )}
                                />

                                <PhoneInput />
                                <CompanyInput />
                            </>
                        )}

                        <Button fullWidth loading={isLoading} type="submit" mt={16}>
                            {step < 3 ? trans("buttons", "next") : trans("buttons", "register")}
                        </Button>
                    </form>
                </FormProvider>

                {/* Разделитель «ИЛИ» */}
                <Divider label={trans("global", "or")} labelPosition="center" mt={25} mb={25} />

                {/* Пример кнопки сторонней авторизации (здесь Яндекс) */}
                <Button variant="outline" fullWidth mb={25} disabled>
                    <Image src="/icons/yandex.svg" width="16" height="16" mr={8} />
                    {trans("auth", "buttons.yandex")} {trans("global", "soon")}
                </Button>

                <Text className={classes.textConditions} mt="md">
                    {trans("auth", "conditions.text")}{" "}
                    <Text component={Link} href="/processing">
                        {trans("auth", "conditions.processing")}
                    </Text>{" "}
                    {trans("global", "and")}{" "}
                    <Text component={Link} href="/privacy">
                        {trans("auth", "conditions.privacy")}
                    </Text>
                </Text>
            </Flex>
        </Container>
    );
}