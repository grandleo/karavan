import {useFormContext} from "react-hook-form";
import {EmailField} from "@/components/inputs";
import {Button} from "@mantine/core";

const AuthLogin = ({onSubmit, loading} : AuthLoginTypes) => {
    const { control, handleSubmit } = useFormContext();

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <EmailField control={control} context="auth"/>

            <Button type="submit" loading={loading} fullWidth>Продолжить</Button>
        </form>
    )
}

export default AuthLogin;