'use client'

import {useDisclosure} from "@mantine/hooks";
import {Button, Checkbox, Drawer, Group, PinInput, Select, TextInput, UnstyledButton} from "@mantine/core";
import {IconDotsVertical, IconPlus} from "@tabler/icons-react";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useCreateSpecificationMutation} from "@/store/api/admin/specifications.api";

const AddSpecificationItem = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const [createSpecification, result] = useCreateSpecificationMutation();

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        console.log(data)
        createSpecification(data).then(() => {
            console.log('ура')
        })
    }

    return (
        <>
            <UnstyledButton onClick={open}>
                <IconPlus/>
            </UnstyledButton>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление поля">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Название"
                                error={errors?.name?.message}
                                onChange={(event) => {
                                    field.onChange(event.currentTarget.value);
                                }}
                            />
                        )}
                        name="name"
                    />
                    <Checkbox
                        {...register("required")}
                        defaultChecked
                        label="Обязательное поле"
                    />

                    <Checkbox
                        {...register("use_product_name")}
                        defaultChecked
                        label="Участвует в формировании названия"
                    />

                    <PrimaryBtn type="submit">Добавить</PrimaryBtn>

                </form>
            </Drawer>
        </>
    )
}

export default AddSpecificationItem;