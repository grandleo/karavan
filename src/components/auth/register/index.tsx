import {Button} from "@mantine/core";
import {useFormContext} from "react-hook-form";
import {NameField, PhoneField, SimpleCompanyName} from "@/components/inputs";

const AuthRegister = ({onSubmit, loading} : AuthRegisterTypes) => {
    const { control, handleSubmit } = useFormContext();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <NameField control={control}/>
            <SimpleCompanyName control={control}/>
            <PhoneField control={control}/>

            <Button mt={15} type="submit" loading={loading} fullWidth>Зарегистрироваться</Button>
        </form>
    )
}

export default AuthRegister;