import {useGetSpecificationQuery, useUpdateSpecificationMutation} from "@/store/api/admin/specifications.api";
import {Controller, useForm} from "react-hook-form";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {Button, Checkbox, Drawer, Flex, Select, TextInput} from "@mantine/core";
import SpecificationValues from "@/components/Specifications/form/SpecificationValues";
import {useSelector} from "react-redux";
import {getSpecificationsState} from "@/store/slices/specificationsSlice";
import {useEffect} from "react";
import {useActions} from "@/hooks/useActions";
import classes from "../specifications.module.css"
import {UpdateSpecificationProps} from "@/types/specification";

const UpdateSpecification = ({opened, close} : UpdateSpecificationProps) => {
    const {active} = useSelector(getSpecificationsState);
    const [updateSpecification] = useUpdateSpecificationMutation();
    const {data, isLoading} = useGetSpecificationQuery(active)

    const {setActiveSpecification} = useActions();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: 0,
            name: '',
            required: 1,
            use_product_name: 0,
            type_choice: 'single',
            values: []
        }
    });

    useEffect(() => {
        if(data){
            setValue('id', data.id)
            setValue('name', data.name)
            setValue('required', data.required)
            setValue('use_product_name', data.use_product_name)
            setValue('type_choice', data.type_choice)
            setValue('values', data.values)
        }
    }, [data]);

    const onSubmit = async (data: any) => {
        updateSpecification(data).unwrap()
            .then((payload) => {
                close();
                reset();
                setActiveSpecification(0);
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
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
                                        value={field.value}
                                        error={errors?.name?.message}
                                        onBlur={field.onBlur}
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

                            <SpecificationValues setValue={setValue} id_specification={active}/>

                            <Button type="submit">Обновить характеристику</Button>
                        </Flex>
                    </form>
                </>
            </Drawer>
        </>
    )
}

export default UpdateSpecification;