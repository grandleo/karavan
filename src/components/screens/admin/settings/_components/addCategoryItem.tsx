'use client'

import {useDisclosure} from "@mantine/hooks";
import {Drawer, TextInput, UnstyledButton} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useCreateCategoryMutation} from "@/store/api/admin/categories.api";

const AddCategoryItem = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const [createCategory] = useCreateCategoryMutation();

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        createCategory(data).then(() => {
            console.log('ура')
        })
    }

    return (
        <>
            <UnstyledButton onClick={open}>
                <IconPlus/>
            </UnstyledButton>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление категории">

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

                    <PrimaryBtn type="submit">Добавить</PrimaryBtn>

                </form>
            </Drawer>
        </>
    )
}

export default AddCategoryItem;