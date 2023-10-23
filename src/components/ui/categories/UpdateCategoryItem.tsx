import {Controller, useForm} from "react-hook-form";
import {Box, Drawer, TextInput} from "@mantine/core";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import CategorySpecifications from "@/components/ui/categories/CategorySpecifications";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import {useUpdateCategoryMutation} from "@/store/api/admin/categories.api";
import {Dispatch, SetStateAction, useEffect} from "react";
import classes from "@/components/ui/categories/categoryList.module.css";

interface ICategoryItem {
    id: number;
    name: string;
    parent_id: number;
    category_specifications: [];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    category: ICategoryItem;
    setSpecification?: Dispatch<SetStateAction<[]>>;
}

const UpdateCategoryItem = ({category, isOpen, onClose}: Props) => {
    const [updateCategory] = useUpdateCategoryMutation();

    const {
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
            specifications: []
        }
    });

    useEffect(() => {
        setValue('id', category.id)
        setValue('name', category.name)
        setValue('parent_id', category.parent_id)
        setValue('specifications', category.category_specifications)
        console.log('update', category)
    }, [category]);

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

        <Drawer opened={isOpen} position="right" onClose={onClose} title="Редактирование категории">

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

                        <CategorySpecifications setSpecificationValues={setValue} categorySpecifications={category.category_specifications}/>
                    </Box>
                    <Box>
                        <PrimaryBtn type="submit">Сохранить</PrimaryBtn>
                    </Box>
                </Box>
            </form>
        </Drawer>

    )
}

export default UpdateCategoryItem;