import {Button, Group, PinInput} from "@mantine/core";
import {Controller, useFormContext} from "react-hook-form";
import {PinCode} from "@/components/inputs";

const AuthCheckCode = ({onSubmit, loading} : AuthCheckCodeTypes) => {
    const { control, handleSubmit, formState: { errors } } = useFormContext();

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <PinCode control={control} errors={errors}/>

            <Button type="submit" loading={loading} fullWidth>Продолжить</Button>
        </form>
    )
}

export default AuthCheckCode;