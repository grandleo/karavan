import {NumberInput} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {useEditOrderMutation} from "@/store/api/order.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useEffect} from "react";

interface Props {
    number_id: number,
    weight: string | number
}

const WeightOrder = ({number_id, weight} : Props) => {

    const [editOrder] = useEditOrderMutation();

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            number_id: 0,
            weight: 0,
        }
    });

    const onSubmit = (value: Props) => {
        if(value.weight !== weight) {
            editOrder(value).unwrap().then((payload) => {
                SuccessNotifications(payload)
            }).catch((error) => ErrorNotifications(error))
        }
    }

    useEffect(() => {
        setValue('number_id', number_id);
        setValue('weight', Number(weight));
    }, [weight, number_id]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="weight"
                    control={control}
                    render={({ field: { value } }) => (
                        <NumberInput
                            value={value}
                            onChange={(value) => {
                                setValue('weight', Number(value));
                            }}
                            onBlur={handleSubmit(onSubmit)}
                            rightSection=" "
                            min={0}
                            clampBehavior="strict"
                            thousandSeparator=" "
                            label="Вес, кг"
                            placeholder="0"
                            description="Например, 15"
                            inputWrapperOrder={['label', 'input', 'error', 'description']}
                        />
                    )}
                />
            </form>
        </>
    )
}

export default WeightOrder;