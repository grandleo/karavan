import {Combobox, ScrollArea, TextInput, useCombobox} from "@mantine/core";
import {useState} from "react";
import {daData} from "@/config/daData";

const EmailField = ({field, errors} : EmailFieldTypes) => {
    const combobox = useCombobox();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const shouldFilterOptions = !data.some((item) => item === value);
    const filteredOptions = shouldFilterOptions ? data.filter((item:any) => item.toLowerCase().includes(value.toLowerCase().trim())) : data;

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const handleChange = async (value: any) => {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/email";

        if(value.includes("@")){

            await daData.post(url, JSON.stringify({query: value}))
                .then(function (response) {
                    const {suggestions} = response.data
                    const items: any = prepareSuggestions(suggestions);
                    setData(items);
                })
                .catch(function (error) {
                    console.log("error", error)
                });
        } else {
            setData([]);
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
                    label="Email"
                    placeholder="Введите вашу почту"
                    value={field.value}
                    error={errors.email?.message}
                    onChange={(event) => {
                        field.onChange(event.currentTarget.value.replace(/ +/g, ''))
                        handleChange(event.currentTarget.value.replace(/ +/g, ''));
                        setValue(event.currentTarget.value.replace(/ +/g, ''));
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

const prepareSuggestions = (suggestions: any) => {
    const prepareData: any = [];

    suggestions.forEach((item: any) => {
        prepareData.push(item.value);
    })

    return prepareData;
}

export default EmailField;