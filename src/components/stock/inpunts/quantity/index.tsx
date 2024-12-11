import {KeyboardEvent, useState, FocusEvent} from 'react';
import {NumberInput} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";
import classes from "@/components/stock/styles.module.css";

const QuantityInput = ({width, handleUpdate}: QuantityInputTypes) => {
    const {control} = useFormContext();
    const [isFocused, setIsFocused] = useState(false);

    const icon = (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.3999 2.40002H8.3999C7.7369 2.40002 7.1999 2.93702 7.1999 3.60002V6.00002C7.1999 6.66302 6.6629 7.20002 5.9999 7.20002H3.5999C2.9369 7.20002 2.3999 7.73702 2.3999 8.40002V14.4C2.3999 15.063 2.9369 15.6 3.5999 15.6H14.3999C15.0629 15.6 15.5999 15.063 15.5999 14.4V3.60002C15.5999 2.93702 15.0629 2.40002 14.3999 2.40002ZM11.9999 10.2C11.9999 11.1924 11.1923 12 10.1999 12H7.1999V13.8L4.7999 11.4L7.1999 9.00002V10.8H10.1999C10.5305 10.8 10.7999 10.5312 10.7999 10.2V6.60002C10.7999 6.26822 11.0687 6.00002 11.3999 6.00002C11.7311 6.00002 11.9999 6.26822 11.9999 6.60002V10.2Z"
                fill="#C1C6D0"
            />
        </svg>
    );

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
                    rightSection={icon}
                />
            )}
        />
    )
}

export default QuantityInput;