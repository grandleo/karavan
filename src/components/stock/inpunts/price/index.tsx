import { KeyboardEvent } from 'react';
import {NumberInput} from "@mantine/core";
import classes from "./style.module.css";
import {Controller, useFormContext} from "react-hook-form";

const PriceInput = ({new_price, width, handleUpdate}: PriceInputTypes) => {
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useFormContext();

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleUpdate()
        }
    };

    return (

        <Controller
            name="price"
            control={control}
            rules={{
                required: "Цена товара обязательна",
            }}
            render={({field: {onChange, onBlur, value}}) => (
                <NumberInput
                    classNames={{
                        input: `${classes.input_price} ${new_price ? classes.new_price : classes.price}`,
                    }}
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    onKeyDown={handleKeyPress}
                    placeholder="Цена товара"
                    rightSection="₽"
                    rightSectionPointerEvents="none"
                    min={0}
                    max={9999999}
                    thousandSeparator=" "
                    w={width}
                />
            )}
        />
    )
}

export default PriceInput;