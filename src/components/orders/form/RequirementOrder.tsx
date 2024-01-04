import {Controller, useForm} from "react-hook-form";
import {TextInput} from "@mantine/core";
import {useEditOrderMutation} from "@/store/api/order.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useEffect} from "react";

interface Props {
    number_id: number,
    requirement: string
}

const RequirementOrder = ({number_id, requirement} : Props) => {

    const [editOrder] = useEditOrderMutation();

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            number_id: 0,
            requirement: '',
        }
    });

    const onSubmit = (value: Props) => {
        if(value.requirement !== requirement) {
            editOrder(value).unwrap().then((payload) => {
                SuccessNotifications(payload)
            }).catch((error) => ErrorNotifications(error))
        }
    }

    useEffect(() => {
        setValue('number_id', number_id);
        setValue('requirement', requirement);
    }, [requirement, number_id]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="requirement"
                    control={control}
                    render={({field: {value}}) => (
                        <TextInput
                            value={value}
                            onChange={(value) => {
                                setValue('requirement', value.currentTarget.value);
                            }}
                            onBlur={handleSubmit(onSubmit)}
                            mb="0"
                            label="Требования к транспорту"
                            placeholder="Введите значение"
                            description="Например, наличие холодильника"
                            inputWrapperOrder={['label', 'input', 'error', 'description']}
                        />
                    )}
                />
            </form>
        </>
    )
}

export default RequirementOrder;