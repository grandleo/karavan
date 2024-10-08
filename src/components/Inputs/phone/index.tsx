import React from "react";
import {Input} from "@mantine/core";
import {IMaskInput} from "react-imask";
import {Controller} from "react-hook-form";
import {PhoneFieldProps} from "@/components/Inputs/types";

const PhoneField = ({ control, name = "phone"} : PhoneFieldProps) => {
    const validationRules = {
        required: "Поле обязательно для заполнения",
        minLength: { value: 10, message: "Введите корректный номер телефона" }
    };

    const formatPhoneNumber = (phone: string) => {
        const digits = phone.replace(/\D/g, '');
        if (digits.startsWith('7')) {
            return digits.slice(1);
        } else if (digits.startsWith('8')) {
            return digits.slice(1);
        } else if (digits.startsWith('8')) {
            return digits.slice(2);
        }
        return digits;
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>, onChange: (value: string) => void) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('Text');
        const formattedPhoneNumber = formatPhoneNumber(pastedText);
        onChange(formattedPhoneNumber);
    };

    return (
        <Controller
            name={name}
            rules={validationRules}
            control={control}
            render={({ field: { onChange, onBlur, value } , fieldState: { error }}) => (
                <Input.Wrapper label="Телефон" error={error?.message}>
                    <Input
                        component={IMaskInput}
                        mask="(000) 000-00-00"
                        placeholder="Укажите ваш телефон"
                        onBlur={onBlur}
                        onChange={(event) => onChange(formatPhoneNumber(event.currentTarget.value))}
                        onPaste={(event) => handlePaste(event, onChange)}
                        value={value}
                        leftSection="+7"
                        autoComplete="new-password"
                    />
                </Input.Wrapper>
            )}
        />
    )
}

export default PhoneField;