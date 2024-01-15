import {Checkbox, Drawer, Select, TextInput} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import {useActions} from "@/hooks/useActions";

const AddOrUpdateSpecification = ({opened, close}) => {

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

    return (
        <Drawer opened={opened} onClose={close} position="right" title="Добавить">
            <>
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
            </>
        </Drawer>
    )
}

export default AddOrUpdateSpecification;