import {useState} from "react";
import {NumberInput, Text} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {modals} from "@mantine/modals";
import {useEditQuantityProductOrderMutation} from "@/store/api/order.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

interface Props {
    id: number,
    quantity: string | number
}

const EditQuantityProduct = ({id, quantity} : Props) => {
    const [editQuantity] = useEditQuantityProductOrderMutation();

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            id: id,
            quantity: quantity,
        }
    });

    const openModal = () => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                This action is so important that you are required to confirm it with a modal. Please click
                one of these buttons to proceed.
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => console.log('Confirmed'),
    });

    const onSubmit = (value: Props) => {
        if(value.quantity < quantity) {
            editQuantity(value).unwrap().then((payload) => {
                SuccessNotifications(payload)
            }).catch((error) => ErrorNotifications(error))
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="quantity"
                control={control}
                render={({ field: { value } }) => (
                    <NumberInput
                        value={value}
                        onChange={(value) => {
                            setValue('quantity', value);
                        }}
                        onBlur={handleSubmit(onSubmit)}
                        max={Number(quantity)}
                        rightSection="Шт"
                        placeholder="Кол-во"
                        clampBehavior="strict"
                        thousandSeparator=" "
                    />
                )}
            />
        </form>
    )
}

export default EditQuantityProduct;