import {Controller, useForm} from "react-hook-form";
import {Box, Button, Checkbox, Drawer, TextInput} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import CategorySpecifications from "@/components/ui/categories/CategorySpecifications";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useUpdateCategoryMutation} from "@/store/api/admin/categories.api";
import {Dispatch, SetStateAction, useEffect} from "react";
import classes from "@/components/ui/categories/categoryList.module.css";
import {useSelector} from "react-redux";
import {getCategoriesState} from "@/store/slices/categorySlice";

interface ICategoryItem {
    id: number;
    name: string;
    parent_id: number;
    category_specifications: [];
    required_period_validity: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setSpecification?: Dispatch<SetStateAction<[]>>;
}

const UpdateCategoryItem = ({isOpen, onClose}: Props) => {
    const {editCategory} = useSelector(getCategoriesState);
    const [updateCategory] = useUpdateCategoryMutation();

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
            parent_id: 0,
            required_period_validity: 0,
            specifications: []
        }
    });

    useEffect(() => {
        setValue('id', editCategory.id)
        setValue('name', editCategory.name)
        setValue('parent_id', editCategory.parent_id)
        setValue('specifications', editCategory.category_specifications)
        setValue('required_period_validity', editCategory.required_period_validity)
    }, [editCategory]);

    const onSubmit = async (data: any) => {
        updateCategory(data).unwrap()
            .then((payload) => {
                onClose();
                reset();
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (

        <Drawer opened={isOpen} position="right" onClose={onClose} size="lg" title="Редактирование категории">

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
                                    value={field.value}
                                    error={errors?.name?.message}
                                    onChange={(event) => {
                                        field.onChange(event.currentTarget.value);
                                    }}
                                />
                            )}
                            name="name"
                        />

                        <Checkbox
                            {...register("required_period_validity")}
                            label="Срок годность товаров обязательно"
                            mb={{ base: 10 }}
                        />

                        <CategorySpecifications setValue={setValue} categoryId={editCategory.id}/>
                    </Box>
                    <Box>
                        <Button type="submit">Сохранить</Button>
                    </Box>
                </Box>
            </form>
        </Drawer>

    )
}

export default UpdateCategoryItem;