import {Controller, useFormContext} from "react-hook-form";
import {TextInput} from "@mantine/core";
import {capitalizeWords} from "@/utils/utils";
import {useTranslation} from "@/hooks/useTranslation";

const CompanyInput = () => {
    const { trans } = useTranslation('en');
    const {control} = useFormContext();

    return (
        <>
            <Controller
            name="company"
            control={control}
            rules={{required: 'ФИО обязательно'}}
            render={({field, fieldState}) => (
                <TextInput
                    label={trans('auth', 'inputs.company')}
                    placeholder={trans('auth', 'placeholders.company')}
                    value={field.value}
                    onChange={(value) => {
                        field.onChange(capitalizeWords(value.currentTarget.value));
                    }}
                    error={fieldState.error?.message}
                />
            )}
            />
        </>
    )
}

export default CompanyInput;