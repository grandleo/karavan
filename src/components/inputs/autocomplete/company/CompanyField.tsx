import {Combobox, ScrollArea, TextInput, useCombobox} from "@mantine/core";
import {useState} from "react";
import {httpDaData} from "@/config/httpDaData";

const CompanyField = ({field, setField, error}: CompanyFieldTypes) => {
    const combobox = useCombobox();
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');

    const options = data.map((item: any, index: number) => {
        return (
            <Combobox.Option value={item.value} key={index}
                             onClick={(event) => {
                                 setField('inn', item.data?.inn);
                                 setField('company', item.data);
                                 setField('short_with_opf', item.data?.name.short_with_opf)
                             }}
            >
                {item.value}
            </Combobox.Option>
        )
    });

    const handleChange = async (value: any) => {
        await httpDaData.post('suggest/party', {
            query: value,
            "status": ["ACTIVE"]
        }).then(function (response) {
            const {suggestions} = response.data
            setData(suggestions);
        }).catch(function (error) {
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
                        field.onChange(event.currentTarget.value.trim())
                        handleChange(event.currentTarget.value.trim());
                        setValue(event.currentTarget.value.trim());
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onBlur={() => combobox.closeDropdown()}
                    autocomlette="off"
                    error={error}
                    type="number"
                    onInput={(event) => {
                        if (event.currentTarget.value.length > 10) {
                            event.currentTarget.value = event.currentTarget.value.slice(0, 10);
                        }
                    }}
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

export default CompanyField;