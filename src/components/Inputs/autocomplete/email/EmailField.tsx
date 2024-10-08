import {Autocomplete} from "@mantine/core";
import {useState} from "react";
import {httpDaData} from "@/config/httpDaData";
import {Controller} from "react-hook-form";
import {ErrorNotifications} from "@/helpers/Notifications";
import {EmailFieldProps} from "@/components/Inputs/types";
import {http} from "@/config/http";

const EmailField = ({control, context, name = "email"} : EmailFieldProps) => {
    const [data, setData] = useState<string[]>([]);

    const handleChange = async (value: string, onChange: (value: string) => void) => {
        const sanitizedValue = value.replace(/ +/g, '');
        onChange(sanitizedValue);

        if (sanitizedValue.includes('@')) {
            try {
                const response = await httpDaData.post('suggest/email', JSON.stringify({ query: sanitizedValue }));
                const { suggestions } = response.data;
                const items = suggestions.map((suggestion: any) => suggestion.value);
                setData(items);
            } catch (error) {
                console.error('Failed to fetch email suggestions:', error);
            }
        } else {
            setData([]);
        }
    };

    const validateEmail = async (value: string) => {
        try {
            let response;

            if (context === 'warehouse') {
                return true;
            }

            if (context === 'auth') {
                return true;
            }

            if (context === 'profile') {
                response = await http.post('profile/check-email', { 'email': value });
                const { result } = response.data;
                if (!result) {
                    return "Данный email уже используется у другого пользователя";
                }
            }
        } catch (error) {
            ErrorNotifications(error);
            return "Ошибка проверки email";
        }

        return true;
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: "Поле обязательно для заполнения",
                maxLength: { value: 150, message: "Максимальное количество символов 150" },
                pattern: {
                    value: /^(?![-._])[A-Za-z0-9]+([._-]?[A-Za-z0-9]+)*@(?=[A-Za-z0-9])[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})(?<![-._])$/,
                    message: "Введите email в правильном формате",
                },
                validate: validateEmail
            }}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    label="Email"
                    placeholder="Введите вашу почту"
                    value={field.value}
                    onChange={(value) => handleChange(value, field.onChange)}
                    data={data}
                    error={error?.message}
                    onBlur={field.onBlur}
                    autoComplete="new-password"
                    maxDropdownHeight={200}
                    type="email"
                />
            )}
        />
    )
}

export default EmailField;