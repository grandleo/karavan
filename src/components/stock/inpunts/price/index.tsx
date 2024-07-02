import {KeyboardEvent, useState, FocusEvent} from 'react';
import {NumberInput} from "@mantine/core";
import classes from "@/components/stock/styles.module.css";
import {Controller, useFormContext} from "react-hook-form";

const PriceInput = ({new_price, width, handleUpdate}: PriceInputTypes) => {
    const {control, handleSubmit, reset, setValue, formState: {errors}} = useFormContext();
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleUpdate()
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (onBlur: (event: FocusEvent<HTMLInputElement>) => void) => (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur(event);
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
                        input: `${classes.input_price} ${new_price ? classes.new_price : classes.price} ${isFocused ? classes.input_active : ''}`,
                    }}
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur(onBlur)}
                    onKeyDown={handleKeyPress}
                    placeholder="Цена товара"
                    hideControls
                    min={0}
                    max={999999}
                    thousandSeparator=" "
                    w={width}
                    variant="unstyled"
                />
            )}
        />
    )
}

export default PriceInput;