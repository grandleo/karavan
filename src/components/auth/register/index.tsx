import {Controller, useFormContext} from "react-hook-form";
import {Button, TextInput} from "@mantine/core";
import React from "react";
import {NameField, PhoneField} from "@/components/inputs";

const AuthRegister = ({onSubmit} : AuthRegisterTypes) => {
    const { control, handleSubmit, setValue, clearErrors, setError, formState: { errors } } = useFormContext();


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="name"
                rules={{
                    required: "Поле обязательно для заполнения",
                    maxLength: {value: 100, message: "Максимальное кол-во символов 100"}
                }}
                control={control}
                render={({field}) => (
                    <NameField field={field} setField={setValue} error={errors?.name?.message} clearErrors={clearErrors} setError={setError}/>
                )}
            />

            <Controller
                name="company"
                rules={{
                    required: "Поле обязательно для заполнения",
                    maxLength: {value: 100, message: "Максимальное кол-во символов 100"}
                }}
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        label="Компания"
                        placeholder="Укажите название компании"
                        onBlur={onBlur}
                        onChange={(event) => {
                            onChange(event.currentTarget.value);
                        }}
                        value={value}
                        error={errors?.company?.message as string}
                    />
                )}
            />

            <Controller
                name="phone"
                rules={{
                    required: "Поле обязательно для заполнения",
                    minLength: {value: 15, message: "Введите корректный номер телефона"}
                }}
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <PhoneField onChange={onChange} onBlur={onBlur} value={value} error={errors?.phone?.message as string} />
                )}
            />

            <Button mt={15} type="submit" fullWidth>Зарегистрироваться</Button>
        </form>
    )
}

export default AuthRegister;