import {Box, Button, Group, LoadingOverlay, PinInput, Text} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {Dispatch, FC, useEffect, useState} from "react";
import {http} from "@/config/http";
import {CHECK_EMAIL_URL, CHECK_PIN_CODE, LOGIN_URL, SEND_PIN_CODE_URL} from "@/config/apiRoutes";
import FormConditions from "@/components/ui/form/formConditions";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import classes from "@/components/screens/auth/auth.module.css";
import Link from "next/link";
import {EmailField} from "../../Inputs";

const Login = () => {
    const [email, setEmail] = useState<string | null>(null);

    return (
        <>
        {email ? <PinCodeForm email={email}/> : <EmailForm setEmail={setEmail}/> }
        </>
    )
}

interface EmailProps {
    setEmail: Dispatch<string | null>,
}

const EmailForm = ({setEmail}: EmailProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        setError,
        formState: {errors},
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
                setError('email', {type: 'custom', message: error.response?.data?.message});
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <EmailField field={field} errors={errors}/>
                    )}
                />

                <Button type="submit" fullWidth loading={loading}>Продолжить</Button>

                <FormConditions/>

            </form>
        </>
    )
}

interface PinCodeProps {
    email?: string,
}

const PinCodeForm = ({email} : PinCodeProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const {
        handleSubmit,
        control,
        setError,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data: any) => {

        await http.post(CHECK_PIN_CODE, {email: email, ...data}).then(function (response) {

            const auth = http.post(LOGIN_URL, {email: email, ...data});

            signIn('credentials', {
                redirect: true,
                "email": email, ...data,
                callbackUrl: process.env.NEXT_PUBLIC_URL + '/login/check'
            });

            setLoading(false);
        })
            .catch(function (error) {
                setLoading(false);
                setError('pin', {type: 'custom', message: error.response.data?.message});
            });

    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Text className={classes.header}>Код для входа отправлен на {email}</Text>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <Group justify="center">
                        <PinInput onBlur={onBlur} onChange={onChange} value={value} type="number"
                                  error={!!errors.pin?.message} mb={15}/>
                    </Group>
                )}
                name="pin"
            />

            <Button fullWidth type="submit" loading={loading}>
                Войти
            </Button>

            <RepeatPin email={String(email)}/>

            <FormConditions/>
        </form>
    )
}

interface RepeatPinProps {
    email: string;
}

const RepeatPin: FC<RepeatPinProps> = ({email}) => {
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
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}
                            loaderProps={{type: 'bars'}}/>
            {counter > 0 ?
                'Отправить код повторно через: ' + counter
                : <Link href="" onClick={() => handleRepeatPin()}>Отправить код повторно</Link>
            }
        </Box>
    );
}

export default Login;