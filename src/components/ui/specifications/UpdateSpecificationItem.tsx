import {Checkbox, Drawer, TextInput} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useEffect} from "react";
import {useUpdateSpecificationMutation} from "@/store/api/admin/specifications.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";

interface ISpecification {
    id: number,
    name: string,
    required: number,
    use_product_name: number,
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    specification: ISpecification;
}

const UpdateSpecificationItem = ({specification, isOpen, onClose}: Props) => {
    const [updateSpecification] = useUpdateSpecificationMutation();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: 0,
            name: '',
            required: 0,
            use_product_name: 0,
        }
    });

    useEffect(() => {
        setValue('id', specification.id)
        setValue('name', specification.name)
        setValue('required', specification.required)
        setValue('use_product_name', specification.use_product_name)
    }, [specification]);

    const onSubmit = async (data: ISpecification) => {
        updateSpecification(data).unwrap()
            .then((payload) => {
                onClose();
                reset();
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <Drawer opened={isOpen} onClose={onClose} position="right" title={specification.name}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                value={field.value}
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
                    />

                    <Checkbox
                        {...register("use_product_name")}
                        label="Участвует в формировании названия"
                    />

                    <PrimaryBtn type="submit">Сохранить</PrimaryBtn>
                </form>
            </Drawer>
        </>
    )
}

export default UpdateSpecificationItem;