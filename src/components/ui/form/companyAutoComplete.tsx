import {useState} from "react";
import {Combobox, ScrollArea, TextInput, useCombobox} from "@mantine/core";
import {daData} from "@/config/daData";

//TODO: 5048024305
//TODO: 502482528489

const CompanyAutocomplete = ({field, setField, error}: any) => {
    const combobox = useCombobox();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');

    const options = data.map((item: any) => {
        return (
            <Combobox.Option value={item.value} key={item.value}
                             onClick={ (event) => {
                                 setField('inn', item.data?.inn);
                                 setField('company', item.data);
                                 setField('short_with_opf', item.data?.name.short_with_opf)
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
                    value={field.value}
                    onChange={(event) => {
                        field.onChange(event.currentTarget.value)
                        handleChange(event.currentTarget.value);
                        setValue(event.currentTarget.value);
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onBlur={() => combobox.closeDropdown()}
                    autocomlette="off"
                    error={error}
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

export default CompanyAutocomplete;