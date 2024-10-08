import {Flex, PinInput, Text} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";

const PinCodeInput = () => {
    const { control, formState: { errors } } = useFormContext();
    const errorMessage = (errors.pin?.message as string) || '';

    return (
        <Flex
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
            gap={15}
            mb={15}
        >
            <Controller
                name="pin"
                control={control}
                render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                    <PinInput
                        size="xl"
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        type="number"
                        error={!!error}
                    />
                )}

            />

            {errors.pin?.message && (
                <Text c="red" size="sm">
                    {errorMessage}
                </Text>
            )}
        </Flex>
    );
};

export default PinCodeInput;