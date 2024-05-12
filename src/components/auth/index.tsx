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
    phone: ''
};

const Authentication = () => {
    const [step, setStep] = useState(1);

    const methods = useForm({ defaultValues });

    const handleEmailFormSubmit = async (data : IAuthForm) => {
        const response = await http.post('auth/send-pin-code', {email: data.email})

        if (response.status === 200) {
            setStep(2)
        }
    };

    const handleCodeFormSubmit = async (data : IAuthForm) => {
        const response = await http.post('auth/check-pin-code', {email: data.email, pin: data.pin});

        if(response.data.exist === true){
            await login(data.email)
        } else {
            setStep(3);
        }
    };

    const handleRegistrationFormSubmit = async (data : IAuthForm) => {

        const {data: { suggestions }} = await httpDaData.post('suggest/fio', {
            query: data.name.trim()
        })

        if (suggestions.length === 0) {
            methods.setError('name', { type: 'custom', message: 'Что то пошло не так, напишите Имя и Фамилию правильно' });
        }

        const filteredSuggestions = _.filter(suggestions, { 'value': data.name.trim() });
        const {data: firstSuggestion} = _.head(filteredSuggestions)

        if(_.isNull(firstSuggestion.name) || _.isNull(firstSuggestion.surname)){
            methods.setError('name', { type: 'custom', message: 'Что то пошло не так, напишите Имя и Фамилию правильно' });
        }

        const newData = { ...data, fio: firstSuggestion };

        const response = await http.post('auth/registration', newData);

        if(response.status === 200) {
            await login(data.email)
        }
    };
    
    return (
        <>
            <FormProvider {...methods}>
                {step === 1 && <AuthLogin onSubmit={handleEmailFormSubmit}/> }
                {step === 2 && <AuthCheckCode onSubmit={handleCodeFormSubmit}/> }
                {step === 3 && <AuthRegister onSubmit={handleRegistrationFormSubmit}/> }
            </FormProvider>
        </>
    )
}

export default Authentication;