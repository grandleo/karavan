import {Controller, useForm} from "react-hook-form";
import {TextInput} from "@mantine/core";
import {useEditOrderMutation} from "@/store/api/order.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useEffect} from "react";

interface Props {
    number_id: number,
    dimensions: string
}

const DimensionsOrder = ({number_id, dimensions} : Props) => {

    const [editOrder] = useEditOrderMutation();

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            number_id: 0,
            dimensions: '',
        }
    });

    const onSubmit = (value: Props) => {
        console.log(value)
        if(value.dimensions !== dimensions) {
            editOrder(value).unwrap().then((payload) => {
                SuccessNotifications(payload)
            }).catch((error) => ErrorNotifications(error))
        }
    }

    useEffect(() => {
        setValue('number_id', number_id);
        setValue('dimensions', dimensions);
    }, [dimensions, number_id]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="dimensions"
                control={control}
                render={({field: {value}}) => (
                    <TextInput
                        value={value}
                        onChange={(value) => {
                            setValue('dimensions', value.currentTarget.value);
                        }}
                        onBlur={handleSubmit(onSubmit)}
                        mb="0"
                        label="Объем груза, м3"
                        placeholder="Введите значение"
                        description="Например, 10 x 4 x 5"
                        inputWrapperOrder={['label', 'input', 'error', 'description']}
                    />
                )}
            />
        </form>
    )
}

export default DimensionsOrder;