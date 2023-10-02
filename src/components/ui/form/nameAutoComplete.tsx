import {Combobox, ScrollArea, TextInput, useCombobox} from "@mantine/core";
import {useState} from "react";
import {daData} from "@/config/daData";



const NameAutocomplete = ({field, setField}: any) => {
    const combobox = useCombobox();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const shouldFilterOptions = !data.some((item: any) => item.value === value);
    const filteredOptions = shouldFilterOptions ? data.filter((item: any) => item.value.toLowerCase().includes(value.toLowerCase().trim())) : data;

    const options = filteredOptions.map((item: any) => (
        <Combobox.Option value={item.value} key={item.value} onClick={setField('fio', item.data)}>
            {item.value}
        </Combobox.Option>
    ));

    const handleChange = async (value: any) => {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio";

        if(value.length > 3){

            await daData.post(url, JSON.stringify({query: value}))
                .then(function (response) {
                    const {suggestions} = response.data
                    setData(suggestions);
                })
                .catch(function (error) {
                    console.log("error", error)
                });

        }
    }

    return (
        <Combobox
            onOptionSubmit={(optionValue) => {
                setValue(optionValue);
                field.onChange(optionValue);
                combobox.closeDropdown();
            }}
            store={combobox}
        >
            <Combobox.Target>
                <TextInput
                    {...field}
                    label="ФИО"
                    placeholder="Введите ваше фио"
                    value={value}
                    onChange={(event) => {
                        field.onChange(event.currentTarget.value)
                        handleChange(event.currentTarget.value);
                        setValue(event.currentTarget.value);
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onBlur={() => combobox.closeDropdown()}
                    autocomlette="off"
                />
            </Combobox.Target>

            {options.length > 0 && (
                <Combobox.Dropdown>
                    <Combobox.Options>
                        <ScrollArea.Autosize type="scroll" mah={200}>
                            {options}
                        </ScrollArea.Autosize>
                    </Combobox.Options>
                </Combobox.Dropdown>
            )}
        </Combobox>
    )
}

export default NameAutocomplete;