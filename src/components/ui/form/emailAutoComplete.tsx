import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {useState} from "react";
import {daData} from "@/config/daData";

const EmailAutocomplete = ({field, errors}: any) => {
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
                    // control={control}
                    label="Email"
                    placeholder="Введите вашу почту"
                    value={value}
                    error={errors.email?.message}
                    onChange={(event) => {
                        field.onChange(event.currentTarget.value)
                        handleChange(event.currentTarget.value);
                        setValue(event.currentTarget.value);
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    // onClick={() => combobox.openDropdown()}
                    // onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    autocomlette="off"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
                </Combobox.Options>
            </Combobox.Dropdown>
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

export default EmailAutocomplete;