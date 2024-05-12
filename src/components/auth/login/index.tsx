import {Controller, useForm, useFormContext} from "react-hook-form";
import {EmailField} from "@/components/inputs";
import {Button} from "@mantine/core";

const AuthLogin = ({onSubmit} : AuthLoginTypes) => {
    const { control, handleSubmit, formState: { errors } } = useFormContext();

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                render={({field}) => (
                    <EmailField field={field} errors={errors}/>
                )}
            />

            <Button type="submit" fullWidth>Продолжить</Button>
        </form>
    )
}

export default AuthLogin;