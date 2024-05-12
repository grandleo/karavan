import {Button, Group, PinInput} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";

const AuthCheckCode = ({onSubmit} : AuthCheckCodeTypes) => {
    const { control, handleSubmit, formState: { errors } } = useFormContext();

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <Group justify="center">
                        <PinInput onBlur={onBlur} onChange={onChange} value={value} type="number"
                                  error={!!errors.pin?.message} mb={15} size="xl"/>
                    </Group>
                )}
                name="pin"
            />

            <Button type="submit" fullWidth>Продолжить</Button>
        </form>
    )
}

export default AuthCheckCode;