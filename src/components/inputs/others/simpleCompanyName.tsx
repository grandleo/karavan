import {TextInput} from "@mantine/core";
import {Controller} from "react-hook-form";
import {SimpleCompanyNameProps} from "@/components/inputs/types";

const SimpleCompanyName = ({control}: SimpleCompanyNameProps) => {
    const validateCompany = (value) => {
        if (!value) return "Поле обязательно для заполнения";
        if (value.startsWith(' ')) return "Название компании не должно начинаться с пробела";
        if (/ {2,}/.test(value)) return "Запрещено использование более одного пробела подряд";
        if (/[^a-zA-Zа-яА-Я.,\-\'\s]/.test(value)) return "Запрещены символы кроме букв, запятой, точки, дефиса и кавычек";
        return true;
    };

    const processCompanyName = (value) => {
        let processedValue = value.trimStart();
        processedValue = processedValue.replace(/\s{2,}/g, ' '); // Remove extra spaces
        return processedValue.replace(/^\w|^\s*[а-яА-Я]/, (char) => char.toUpperCase());
    };

    return (
        <Controller
            name="company"
            rules={{
                required: "Поле обязательно для заполнения",
                maxLength: {value: 100, message: "Максимальное кол-во символов 100"},
                validate: validateCompany
            }}
            control={control}
            render={({field: {onChange, onBlur, value}, fieldState : {error}}) => (
                <TextInput
                    label="Компания"
                    placeholder="Укажите название компании"
                    onBlur={onBlur}
                    onChange={(event) => {
                        const newValue = processCompanyName(event.currentTarget.value);
                        onChange(newValue);
                    }}
                    value={value}
                    error={error?.message}
                />
            )}
        />
    )
}

export default SimpleCompanyName;