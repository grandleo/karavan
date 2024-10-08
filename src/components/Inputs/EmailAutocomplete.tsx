import {Controller, useFormContext, useWatch} from "react-hook-form";
import useDadataEmailSuggest from "@/hooks/useDadataEmailSuggest";
import {Autocomplete} from "@mantine/core";
import {sanitizeEmail} from "@/utils/utils";

interface EmailAutocompleteProps {
    label: string;
    placeholder?: string;
}

const EmailAutocomplete = ({ label, placeholder }: EmailAutocompleteProps) => {
    const { control, setValue } = useFormContext();

    // Используем useWatch для отслеживания значения автокомплита
    const query = useWatch({ control, name: 'email.query' });

    const { suggestions, loading, error } = useDadataEmailSuggest(query);

    const handleOptionSubmit = (value: string) => {
        // Устанавливаем выбранный email
        setValue('email', value, { shouldValidate: true });
    };

    const sanitizeInput = (value: string): string => {
        // Удалить начальные пробелы
        let sanitized = value.trimStart();
        // Заменить два и более пробелов на один
        sanitized = sanitized.replace(/\s{2,}/g, ' ');
        // Оставить только допустимые символы в email
        sanitized = sanitizeEmail(sanitized);
        return sanitized;
    };

    // Используем Controller для интеграции с React Hook Form
    return (
        <Controller
            name="email"
            control={control}
            rules={{
                required: 'Email обязателен',
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Неверный формат email',
                },
            }}
            render={({ field, fieldState }) => {
                const { value, onChange, onBlur } = field;
                const { suggestions, loading, error } = useDadataEmailSuggest(value);

                const handleSelect = (selectedValue: string) => {
                    setValue('email', selectedValue, { shouldValidate: true });
                };

                return (
                        <Autocomplete
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            onOptionSubmit={handleOptionSubmit}
                            label={label}
                            placeholder={placeholder || 'Введите email'}
                            data={suggestions.map((suggestion) => ({
                                value: suggestion.value,
                            }))}
                            error={fieldState.error?.message}
                        />
                );
            }}
        />
    );
};

export default EmailAutocomplete;