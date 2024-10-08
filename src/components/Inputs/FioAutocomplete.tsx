import {Controller, useFormContext, useWatch} from "react-hook-form";
import useDadataSuggestName from "@/hooks/useDadataSuggestName";
import {Autocomplete, Group, Loader, Text} from "@mantine/core";
import {capitalizeWords} from "@/utils/utils";

interface FioAutocompleteProps {
    label: string;
    placeholder?: string;
}

const FioAutocomplete = ({label, placeholder}: FioAutocompleteProps) => {
    const {control, setValue} = useFormContext();

    // Используем useWatch для отслеживания значения автокомплита
    const query = useWatch({ control, name: 'fio.query' });

    const {suggestions, loading, error} = useDadataSuggestName(query);

    const handleOptionSubmit = (value: string) => {
        // Найти соответствующее предложение по значению
        const selectedSuggestion = suggestions.find(
            (suggestion) =>
                `${suggestion.data.surname} ${suggestion.data.name} ${suggestion.data.patronymic}` === value
        );

        if (selectedSuggestion) {
            const { surname, name, patronymic } = selectedSuggestion.data;
            setValue('fio.surname', surname, { shouldValidate: true });
            setValue('fio.name', name, { shouldValidate: true });
            setValue('fio.patronymic', patronymic, { shouldValidate: true });
        }
    };

    const sanitizeInput = (value: string) => {
        // Удалить начальные пробелы
        let sanitized = value.trimStart();
        // Заменить два и более пробелов на один
        sanitized = sanitized.replace(/\s{2,}/g, ' ');
        // Оставить только кириллические символы и пробелы
        sanitized = sanitized.replace(/[^а-яА-ЯёЁ\s]/g, '');
        // Привести каждое слово к заглавной букве
        sanitized = capitalizeWords(sanitized);
        return sanitized;
    };

    return (
        <Controller
            name="fio.query"
            control={control}
            rules={{required: 'ФИО обязательно'}}
            render={({field, fieldState}) => (
                <Autocomplete
                    value={field.value}
                    onChange={(value) => {
                        const sanitized = sanitizeInput(value);
                        field.onChange(sanitized);
                    }}
                    onOptionSubmit={handleOptionSubmit}
                    label={label}
                    placeholder={placeholder || 'Введите ФИО'}
                    data={suggestions.map((suggestion) =>
                        `${suggestion.value}`
                    )}
                    error={fieldState.error?.message || (error ? 'Ошибка при получении предложений' : null)}
                />
            )}
        />
    );
};

export default FioAutocomplete;