import {KeyboardEvent} from 'react';
import {NumberInput} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";

const QuantityInput = ({width, handleUpdate}: QuantityInputTypes) => {
    const {control} = useFormContext();

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleUpdate();
        }
    };

    return (
        <Controller
            name="quantity"
            control={control}
            rules={{
                required: "Кол-во товара обязательно",
            }}
            render={({field: {onChange, value}}) => (
                <NumberInput
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="Кол-во"
                    rightSection="pc"
                    rightSectionPointerEvents="none"
                    min={0}
                    max={9999}
                    thousandSeparator=" "
                    w={width}
                />
            )}
        />
    )
}

export default QuantityInput;