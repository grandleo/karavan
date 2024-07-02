import {KeyboardEvent, useState, FocusEvent} from 'react';
import {NumberInput} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";
import classes from "@/components/stock/styles.module.css";

const QuantityInput = ({width, handleUpdate}: QuantityInputTypes) => {
    const {control} = useFormContext();
    const [isFocused, setIsFocused] = useState(false);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleUpdate();
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
            name="quantity"
            control={control}
            rules={{
                required: "Кол-во товара обязательно",
            }}
            render={({field: {onChange, onBlur, value}}) => (
                <NumberInput
                    classNames={{
                        input: `${classes.input_quantity} ${isFocused ? classes.input_active : ''}`,
                    }}
                    value={value}
                    onChange={(quantity) => {
                        onChange(quantity);
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur(onBlur)}
                    onKeyDown={handleKeyPress}
                    placeholder="Кол-во"
                    hideControls
                    min={0}
                    max={9999}
                    thousandSeparator=" "
                    w={width}
                    variant="unstyled"
                />
            )}
        />
    )
}

export default QuantityInput;