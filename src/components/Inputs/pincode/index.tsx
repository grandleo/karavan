import {Flex, PinInput, Text} from "@mantine/core";
import {Controller} from "react-hook-form";
import {PinCodeProps} from "@/components/Inputs/types";

const PinCode = ({control, errors}: PinCodeProps) => {
    const errorMessage = (errors.pin?.message as string) || '';

    return (
        <>
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
                    render={({field: {onChange, onBlur, value}}) => (
                        <PinInput
                            size="xl"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            type="number"
                            error={!!errorMessage}
                        />
                    )}

                />

                {errors.pin?.message && (
                    <Text c="red" size="sm">
                        {errorMessage}
                    </Text>
                )}
            </Flex>
        </>
    )
}

export default PinCode;