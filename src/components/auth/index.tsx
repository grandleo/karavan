import {useState} from "react";
import AuthLogin from "@/components/auth/login";
import AuthCheckCode from "@/components/auth/check-code";
import AuthRegister from "@/components/auth/register";
import {FormProvider, useForm} from "react-hook-form";
import {http} from "@/config/http";
import {login} from "@/helpers/auth";
import {httpDaData} from "@/config/httpDaData";
import _ from "lodash";

const defaultValues = {
    email: '',
    pin: '',
    name: '',
    fio: [],
    company: '',
    phone: '',
    search: {
        name: ''
    }
};

type Suggestion = {
    value: string;
    data: {
        name: string | null;
        surname: string | null;
    };
};

const Authentication = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const methods = useForm({ defaultValues });

    const validateName = async (name: string): Promise<boolean> => {
        try {
            const { data: { suggestions } } = await httpDaData.post<{ suggestions: Suggestion[] }>('suggest/fio', { query: name.trim() });

            const filteredSuggestions = suggestions.filter((suggestion: Suggestion) => suggestion.value === name.trim());

            if (filteredSuggestions.length === 0) {
                methods.setError('search.name', { type: 'custom', message: 'Что-то пошло не так, напишите Имя и Фамилию правильно' });
                return false;
            }

            const { data } = filteredSuggestions[0];

            if (!data.name || !data.surname) {
                methods.setError('search.name', { type: 'custom', message: 'Что-то пошло не так, напишите Имя и Фамилию правильно' });
                return false;
            }

            methods.setValue('fio', data);
            return true;
        } catch (error: any) {
            if (error instanceof Error) {
                methods.setError('search.name', { type: 'custom', message: error.message });
            } else {
                methods.setError('search.name', { type: 'custom', message: 'Произошла ошибка при проверке имени. Попробуйте снова.' });
            }
            return false;
        }
    };

    const handleEmailFormSubmit = async (data : IAuthForm) => {
        setLoading(true);
        try {
            const response = await http.post('auth/send-pin-code', { email: data.email });

            if (response.status === 200) {
                setStep(2);
            }
        } finally {
            setTimeout(() => setLoading(false), 300);
        }
    };

    const handleCodeFormSubmit = async (data : IAuthForm) => {
        setLoading(true);
        try {
            const response = await http.post('auth/check-pin-code', { email: data.email, pin: data.pin });

            if (response.data.success) {
                if (response.data.exist === true) {
                    await login(data.email);
                } else {
                    setStep(3);
                }
            } else {
                methods.setError('pin', { message: 'Ошибка проверочного кода. Попробуйте ещё раз' });
            }
        } finally {
            setTimeout(() => setLoading(false), 300);
        }
    };

    const handleRegistrationFormSubmit = async (data : IAuthForm) => {
        setLoading(true);
        try {
            const isNameValid = await validateName(data.search.name);

            if (!isNameValid) {
                return;
            }

            const newData = { ...data, fio: methods.getValues('fio') };

            const response = await http.post('auth/registration', newData);

            if (response.status === 200) {
                await login(data.email);
            }
        } finally {
            setTimeout(() => setLoading(false), 300);
        }
    };
    
    return (
        <>
            <FormProvider {...methods}>
                {step === 1 && <AuthLogin onSubmit={handleEmailFormSubmit} loading={loading} /> }
                {step === 2 && <AuthCheckCode onSubmit={handleCodeFormSubmit} loading={loading} /> }
                {step === 3 && <AuthRegister onSubmit={handleRegistrationFormSubmit} loading={loading} /> }
            </FormProvider>
        </>
    )
}

export default Authentication;