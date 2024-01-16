import {Box, Button, Checkbox, Drawer, Flex, Select, TextInput} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {useActions} from "@/hooks/useActions";
import {IconPlus} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import SpecificationValues from "@/components/Specifications/form/SpecificationValues";
import {useCreateSpecificationMutation} from "@/store/api/admin/specifications.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import classes from "@/components/Specifications/specifications.module.css";

const AddSpecification = () => {
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
            <Button onClick={open}>
                <IconPlus style={{ width: '70%', height: '70%', marginRight: '10px' }} stroke={1.5} /> Добавить
            </Button>

            <Drawer opened={opened} onClose={close} position="right" title="Добавить">
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex direction="column" className={classes.form}>
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
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Тип выбора"
                                        data={[
                                            { value: 'single', label: 'Единичный выбор' },
                                            { value: 'multiple', label: 'Множественный выбор' },
                                        ]}
                                        mb={{ base: 10 }}
                                    />
                                )}/>

                            <SpecificationValues setValue={setValue}/>

                            <Button type="submit">Добавить характеристику</Button>
                        </Flex>
                    </form>
                </>
            </Drawer>
        </>
    )
}

export default AddSpecification;