import {IMaskInput} from "react-imask";
import {InputBase} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";
import React, {useCallback} from "react";
import {formatPhoneNumber, handlePaste} from "@/utils/utils";
import {useTranslation} from "@/hooks/useTranslation";

const PhoneInputBase = InputBase.withProps({
    mask: '+7 (000) 000-0000',
    component: IMaskInput,
    label: 'Ваш номер телефона',
    placeholder: 'Ваш номер телефона',
});

const PhoneInput = () => {
    const { trans } = useTranslation('en');
    const {control, setValue} = useFormContext();

    // Используем useCallback для мемоизации функции изменения значения
    const onChangeHandler = useCallback(
        (value: any, onChange: (value: string) => void) => {
            const formatted = formatPhoneNumber(value.currentTarget.value);
            onChange(formatted);
        },
        []
    );

    return (
        <Controller
            name="phone"
            control={control}
            rules={{
                required: 'Телефон обязателен, введите его'
            }}
            render={({field, fieldState}) => (
                <PhoneInputBase
                    placeholder={trans('auth', 'placeholder.phone')}
                    label={trans('auth', 'inputs.phone')}
                    value={field.value}
                    onChange={(value) => onChangeHandler(value, field.onChange)}
                    onPaste={(event) => handlePaste(event, field.onChange)}
                    error={fieldState.error?.message}
                />
            )}
        />
    )
}

export default PhoneInput;