import {MultiSelect, Select} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";

const ProductSelectSpecification = ({ name, item, onChange }) => {
    const { control } = useFormContext();

    const values = item.values.map(({ id, value }) => ({ value: String(id), label: value }));
    const typeChoice = item.type_choice;

    const handleChange = (selectedValue) => {
        if (typeChoice === 'single' && selectedValue === null) {
            onChange(item.id, null);  // Удаляем ключ из спецификаций
        } else if (typeChoice === 'multiple' && selectedValue.length === 0) {
            onChange(item.id, null);  // Удаляем ключ из спецификаций
        } else {
            onChange(item.id, selectedValue);  // Обновляем значение
        }
    };

    const rules = {
        required: item.required ? "Поле обязательно для заполнения." : undefined
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <>
                    {typeChoice === 'single' ? (
                        <Select
                            label={item.name}
                            placeholder="Выберите значение"
                            checkIconPosition="right"
                            searchable
                            nothingFoundMessage="Ничего не найдено..."
                            data={values}
                            clearable={!item.required}
                            value={field.value || ''}
                            onChange={(selectedValue) => {
                                if (selectedValue === null) {
                                    field.onChange(null);
                                } else {
                                    field.onChange(selectedValue);
                                }
                            }}
                            error={error?.message}
                        />
                    ) : (
                        <MultiSelect
                            label={item.name}
                            placeholder="Выберите значение"
                            checkIconPosition="right"
                            searchable
                            nothingFoundMessage="Ничего не найдено..."
                            data={values}
                            clearable={!item.required}
                            value={field.value || []}
                            onChange={(selectedValue) => {
                                if (selectedValue.length === 0) {
                                    field.onChange(null);
                                } else {
                                    field.onChange(selectedValue);
                                }
                            }}
                            error={error?.message}
                        />
                    )}
                </>
            )}
        />
    );
}

export default ProductSelectSpecification;