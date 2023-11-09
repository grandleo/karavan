import {useDisclosure} from "@mantine/hooks";
import {useCreateSpecificationMutation} from "@/store/api/admin/specifications.api";
import {Controller, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {IconPlus} from "@tabler/icons-react";
import {ActionIcon, Checkbox, Drawer, TextInput, Text, Box, Select} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import ValuesSpecificationItem from "@/components/ui/specifications/ValuesSpecificationItem";
import classes from "./specifications.module.css";

interface ISpecification {
    name: string,
    required: number,
    use_product_name: number,
    values: []
}

const AddSpecificationItem = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const [createSpecification] = useCreateSpecificationMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: '',
            required: 1,
            use_product_name: 0,
            type_choice: 'single',
            values: []
        }
    });

    const onSubmit = async (data: any) => {
        createSpecification(data).unwrap()
            .then((payload) => {
                close();
                reset();
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <ActionIcon variant="default" color="rgba(255, 255, 255, 1)" aria-label="Settings" onClick={open} className={classes.itemMenu}>
                <IconPlus/>
            </ActionIcon>

            <Drawer opened={opened} position="right" onClose={close} title="Добавление поля">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box className={classes.formFlex}>
                        <Box className={classes.formArea}>
                            <Controller
                                control={control}
                                rules={{
                                    required: "Поле обязательно для заполнения",
                                    minLength: {
                                        value: 3,
                                        message: "Минимальная длина поля - 3 символа",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Максимальная длина поля - 50 символов",
                                    },
                                }}
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
                                label="Обязательное поле"
                                mb={{ base: 10 }}
                            />

                            <Checkbox
                                {...register("use_product_name")}
                                label="Участвует в формировании названия"
                                mb={{ base: 10 }}
                            />

                            <Controller
                                name="type_choice"
                                control={control}
                                // render={({ field: { onChange, onBlur, value } }) => (
                                render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Тип выбора"
                                    data={[
                                        { value: 'single', label: 'Единичный выбор' },
                                        { value: 'multiple', label: 'Множественный выбор' },
                                    ]}
                                />
                            )}/>

                            <ValuesSpecificationItem onValues={setValue}/>

                        </Box>
                        <Box>
                            <PrimaryBtn type="submit">Добавить</PrimaryBtn>
                        </Box>
                    </Box>

                </form>
            </Drawer>
        </>
    )
}

export default AddSpecificationItem;