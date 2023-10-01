'use client'

import {FC, useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {http} from "@/config/http";
import {CHECK_EMAIL_URL, CHECK_PIN_CODE, SEND_PIN_CODE_URL} from "@/config/apiRoutes";
import EmailAutocomplete from "@/components/ui/form/emailAutoComplete";
import {Box, Button, Group, Loader, LoadingOverlay, PinInput, Text} from "@mantine/core";
import classes from "./auth.module.css";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {signIn} from "next-auth/react";
import {Timeout} from "react-number-format/types/types";
import {TIMEOUT} from "dns";

interface Props {
    setEmail?: () => {},
    email?: string,
}

interface emailCheckProps {
    setEmail?: () => {},
}
interface emailCheckProps {
    email?: string,
}

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
    const [email, setEmail] = useState<string | null>(null);

    return (
        <>
            {email ? <PinVerify email={email}/> : <EmailCheck setEmail={setEmail}/>}
        </>
    );
}

const EmailCheck = ({setEmail}: any) => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (value: any) => {
        setLoading(true);

        await http.post(CHECK_EMAIL_URL, {
            ...value
        }).then(function (response) {

            http.post(SEND_PIN_CODE_URL, {
                ...value
            }).then(function (response) {
                setLoading(false);
                setEmail(value.email)
            })
            .catch(function (error) {
                setLoading(false);
                console.log(error);
            });

        })
        .catch(function (error) {
            setLoading(false);
            // setError();
            setError('email',{ type: 'custom', message: error.response.data?.message });
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Text className={classes.header}>С возвращением!</Text>
                
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <EmailAutocomplete field={field} errors={errors}/>
                    )}
                />

                <Button type="submit" loading={loading} fullWidth className={classes.button}>
                    Продолжить
                </Button>

            </form>
        </>
    )
}

const PinVerify = ({email}: emailCheckProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {

        await http.post(CHECK_PIN_CODE, {email: email, ...data}).then(function (response) {
            signIn('credentials',{redirect: true, "email": email, ...data, callbackUrl: 'http://localhost:3000/login/check' });
            setLoading(false);
        })
        .catch(function (error) {
            setLoading(false);
            setError('pin',{ type: 'custom', message: error.response.data?.message });
        });

    }

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Text className={classes.header}>Код для входа отправлен на {email}</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Group justify="center">
                            <PinInput onBlur={onBlur} onChange={onChange} value={value} type="number" error={!!errors.pin?.message}/>
                        </Group>
                    )}
                    name="pin"
                />

                <Button type="submit" loading={loading} fullWidth className={classes.button}>
                    Войти
                </Button>

                <RepeatPin email={String(email)}/>
            </form>
            <Text className={classes.conditions}>
                Используя сервис Иммунотека, вы соглашаетесь с <Link href="">условиями договора‑оферты</Link>
            </Text>
        </>
    )
}

interface RepeatPinProps {
    email: string;
}

const RepeatPin: FC<RepeatPinProps> = ({ email }) => {
    const [counter, setCounter] = useState<number>(60);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(Number(timer));
    }, [counter]);

    const handleRepeatPin = () => {
        setVisible(true);
        http.post(SEND_PIN_CODE_URL, {
            email: email
        }).then(function (response) {
            setVisible(false);
        })
        .catch(function (error) {
            setVisible(false);
        });
        setCounter(60);
    }

    return (
            <Box className={classes.repeat_password} pos="relative">
                <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ type: 'bars' }}/>
                {counter > 0 ?
                    'Отправить код повторно через: ' + counter
                 : <Link href="" onClick={() => handleRepeatPin()}>Отправить код повторно</Link>
                }
            </Box>
    );
}

export default LoginPage;