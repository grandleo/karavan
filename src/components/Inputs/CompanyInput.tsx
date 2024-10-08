import {Controller, useFormContext} from "react-hook-form";
import {TextInput} from "@mantine/core";
import {capitalizeWords} from "@/utils/utils";

const CompanyInput = () => {
    const {control, setValue} = useFormContext();

    return (
        <>
            <Controller
            name="company"
            control={control}
            rules={{required: 'ФИО обязательно'}}
            render={({field, fieldState}) => (
                <TextInput
                    label="Компания"
                    placeholder="Введите названия компании"
                    value={field.value}
                    onChange={(value) => {
                        field.onChange(capitalizeWords(value.currentTarget.value));
                    }}
                />
            )}
            />
        </>
    )
}

export default CompanyInput;