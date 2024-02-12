import React from "react";
import {Input} from "@mantine/core";
import {IMaskInput} from "react-imask";

const PhoneField = ({ onChange, onBlur, value, error} : PhoneFieldTypes) => {

    return (
        <Input.Wrapper label="Телефон" error={error}>
            <Input component={IMaskInput}
                   mask="(000) 000-00-00"
                   placeholder="Укажите ваш телефон"
                   onBlur={onBlur}
                   onChange={(event) => {
                       onChange(event.currentTarget.value);
                   }}
                   value={value}
                   leftSection="+7"
            />
        </Input.Wrapper>
    )
}

export default PhoneField;