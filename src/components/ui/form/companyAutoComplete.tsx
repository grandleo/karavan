import {Combobox, TextInput, useCombobox} from "@mantine/core";
import {useState} from "react";
import {daData} from "@/config/daData";

//TODO: 5048024305

const CompanyAutocomplete = ({field, setField}: any) => {
    const combobox = useCombobox();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    // const shouldFilterOptions = !data.some((item: any) => item.value === value);
    // const filteredOptions = shouldFilterOptions ? data.filter((item: any) => item.value.toLowerCase().includes(value.toLowerCase().trim())) : data;

    const options = data.map((item: any) => {
        return (
            <Combobox.Option value={item.value} key={item.value}
                             onClick={ (event) => {
                                 setField('company', item.data);
                                 setField('short_with_opf', item.data.name.short_with_opf)
                                }
                             }
            >
                {item.value}
            </Combobox.Option>
        )
    });

    const handleChange = async (value: any) => {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";

        await daData.post(url, JSON.stringify({query: value}))
            .then(function (response) {
                const {suggestions} = response.data
                setData(suggestions);
            })
            .catch(function (error) {
                console.log("error", error)
            });
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
                    label="ИНН"
                    placeholder="Введите ваш инн компании"
                    value={value}
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

            {options.length > 0 && (
                <Combobox.Dropdown>
                    <Combobox.Options>
                        {/*{options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}*/}
                        {options}
                    </Combobox.Options>
                </Combobox.Dropdown>
            )}
        </Combobox>
    )
}

export default CompanyAutocomplete;