import {Autocomplete} from "@mantine/core";
import {useState} from "react";
import {httpDaData} from "@/config/httpDaData";
import {NameFieldProps} from "@/components/Inputs/types";
import {ErrorNotifications} from "@/helpers/Notifications";
import {Controller} from "react-hook-form";

const regex = /^[а-яё\- ]+$/i;

const capitalize = (text: string) => {
    return text.replace(/(^|\s|-)\S/g, (match) => match.toUpperCase());
};

interface Suggestion {
    value: string;
}

const NameField = ({ control, name = "search.name"}: NameFieldProps) => {
    const [data, setData] = useState<string[]>([]);

    const handleInputChange = async (value: string, onChange: (value: string) => void) => {
        const sanitizedValue = capitalize(value.trimStart().replace(/  +/g, ' '));
        onChange(sanitizedValue);

        if (sanitizedValue.length > 3) {
            if (regex.test(sanitizedValue)) {
                try {
                    const response = await httpDaData.post('suggest/fio', { query: sanitizedValue });
                    const { suggestions } = response.data;
                    const uniqueSuggestions = Array.from(new Set((suggestions as Suggestion[]).map(suggestion => suggestion.value)));
                    setData(uniqueSuggestions);
                } catch (error) {
                    ErrorNotifications(error);
                }
            }
        } else {
            setData([]);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: "Поле обязательно для заполнения",
                maxLength: {value: 100, message: "Максимальное кол-во символов 100"},
                pattern: {
                    value: regex,
                    message: "Пожалуйста, введите только символы кириллицы и дефис",
                }
            }}
            render={({ field , fieldState: { error }}) => (
                <Autocomplete
                    label="ФИО"
                    placeholder="Введите ваше фио"
                    value={field.value}
                    onChange={(value) => handleInputChange(value, field.onChange)}
                    data={data}
                    error={error?.message}
                    onBlur={field.onBlur}
                    autoComplete="new-password"
                />
            )}
        />
    );
}

export default NameField;