import {useDisclosure} from "@mantine/hooks";
import {IconPlus} from "@tabler/icons-react";
import {Box, Button, Drawer, TextInput} from "@mantine/core";
import {Controller, useForm} from "react-hook-form";
import PrimaryBtn from "@/components/ui/btn/primaryBtn";
import {useCreateCategoryMutation} from "@/store/api/admin/categories.api";
import {ErrorNotifications, SuccessNotifications} from "@/helpers/Notifications";
import CategorySpecifications from "@/components/ui/categories/CategorySpecifications";
import classes from "./categoryList.module.css";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {getCategoriesState} from "@/store/slices/categorySlice";

interface Props {
    fullWidth?: boolean;
}

const AddCategoryItem = ({fullWidth}: Props) => {
    const {activeCategory} = useSelector(getCategoriesState);
    const [opened, { open, close }] = useDisclosure(false);
    const [createCategory] = useCreateCategoryMutation();

    const {
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            parent_id: activeCategory,
            specifications: []
        }
    });

    useEffect(() => {
        setValue('parent_id', activeCategory)
    }, [activeCategory]);

    const onSubmit = async (data: any) => {
        createCategory(data).unwrap()
            .then((payload) => {
                close();
                reset();
                SuccessNotifications(payload)
            })
            .catch((error) => ErrorNotifications(error))
    }

    return (
        <>
            <Button variant="filled" fullWidth={fullWidth} onClick={open} className={classes.addCategoryItemBtn}>
                <IconPlus size={22}/> Категорию
            </Button>

            <Drawer opened={opened} position="right" size="lg" onClose={close} title="Добавление категории">
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

                            <CategorySpecifications setValue={setValue}/>
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

export default AddCategoryItem;